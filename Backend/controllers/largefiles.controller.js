import mongoose from "mongoose";
import { getbucket } from "../config/db.js";
import { uploadFileToGridFS, validateImageFile, getFileFromGridFS, deleteFileFromGridFS } from "../helper/largefile.js";
import User from "../models/user.model.js";
import Avatar from "../models/avatar.model.js";

/**
 * Upload an image file to GridFS and create avatar record
 * @route POST /api/files/upload-image
 * @access Private
 */
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const { originalname, mimetype, buffer, size } = req.file;
    const { description } = req.body; // REMOVED category

    // Validate image file
    try {
      validateImageFile(buffer, originalname, 5); // 5MB limit
    } catch (validationError) {
      return res.status(400).json({ message: validationError.message });
    }

    // Upload to GridFS
    const fileInfo = await uploadFileToGridFS(
      buffer,
      originalname,
      {
        uploadedBy: req.user.userId,
        mimeType: mimetype,
        size: size,
        description: description || null,
        fileType: "image",
      }
    );

    // new avatar
    const avatar = new Avatar({
      userId: req.user.userId,
      fileId: fileInfo.fileId,
      originalName: originalname,
      description: description || null,
      size: size,
      mimeType: mimetype,
    });

    await avatar.save();

    // Add reference to user's collection
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { avatar_collection: avatar._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Image uploaded successfully",
      avatar: {
        id: avatar._id,
        fileId: avatar.fileId,
        originalName: avatar.originalName,
        description: avatar.description,
        size: avatar.size,
        imageUrl: avatar.imageUrl,
      },
    });

  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};

/**
 * Get file by ID (serves the actual file)
 * @route GET /api/files/:id
 * @param {string} req.params.id - The file ID to retrieve
 * @access Public
 */
export const getFileById = async (req, res) => {
    try {
        const fileId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ message: "Invalid file ID" });
        }

        const objectId = new mongoose.mongo.ObjectId(fileId);

        // Find file info
        const files = await gridfsBucket.find({ _id: objectId }).toArray();
        
        if (!files || files.length === 0) {
            return res.status(404).json({ message: "File not found" });
        }

        const file = files[0];

        // Set appropriate headers based on file type
        const contentType = file.metadata?.mimeType || 'application/octet-stream';
        res.set({
            'Content-Type': contentType,
            'Content-Length': file.length,
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Cache-Control': 'public, max-age=43200', // Cache for 24 hours
        });

        // Create download stream
        const downloadStream = gridfsBucket.openDownloadStream(objectId);
        
        downloadStream.on('error', (error) => {
            console.error("Download error:", error);
            if (!res.headersSent) {
                res.status(500).json({ message: "Error downloading file" });
            }
        });

        // Pipe to response
        downloadStream.pipe(res);

    } catch (error) {
        console.error("Get file error:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Server error" });
        }
    }
};


/**
 * Delete file from GridFS and remove from user's avatar collection
 * @route DELETE /api/files/:id
 * @access Private
 */
/**
 * Delete file from GridFS and remove from user's avatar collection
 * @route DELETE /api/files/:id
 * @param {string} req.params.id - The file ID to delete
 * @param {string} req.user.userId - ID of the authenticated user
 * @access Private
 */
export const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "Invalid file ID" });
    }

    // Find the avatar record first
    const avatar = await Avatar.findOne({ fileId: fileId });
    
    if (!avatar) {
      return res.status(404).json({ message: "Avatar not found" });
    }

    // Check if user owns the avatar or is admin
    if (avatar.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to delete this file" });
    }

    // Delete from GridFS
    await deleteFileFromGridFS(fileId);
    
    // Remove avatar record
    await Avatar.findByIdAndDelete(avatar._id);
    
    // Remove from user's avatar collection
    await User.findByIdAndUpdate(
      avatar.userId,
      { $pull: { avatar_collection: avatar._id } }
    );
    
    res.status(200).json({ message: "File deleted successfully" });

  } catch (error) {
    console.error("Delete file error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all files uploaded by the current user
 * @route GET /api/files/my-files
 * @param {string} req.user.userId - ID of the authenticated user
 * @param {string} [req.query.category] - Optional filter by file category
 * @param {string} [req.query.fileType] - Optional filter by file type
 * @access Private
 */
export const getUserFiles = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get avatars from Avatar collection instead of GridFS directly
    const avatars = await Avatar.find({ 
      userId: userId, 
      isActive: true 
    }).sort({ createdAt: -1 });

    const fileList = avatars.map(avatar => ({
      _id: avatar.fileId,
      filename: avatar.originalName,
      length: avatar.size,
      uploadDate: avatar.createdAt,
      description: avatar.description,
      imageUrl: `/api/files/${avatar.fileId}`,
      contentType: avatar.mimeType,
    }));

    res.status(200).json({
      files: fileList,
      total: fileList.length,
    });

  } catch (error) {
    console.error("Get user files error:", error);
    res.status(500).json({ message: "Server error" });
  }
};





/****************************\
|                            |
|       Not yet needed       |
|                            |
\****************************/

/**
 * Upload document file (PDF, DOC, TXT, etc.)
 * @route POST /api/files/upload-document
 * @access Private
 * @TODO Implement when document support is needed
 */
const uploadDocument = async (req, res) => {
  // TODO: Implement document upload
  // - Validate document file types (.pdf, .doc, .docx, .txt)
  // - Add document-specific metadata
  // - Store in GridFS with fileType: "document"
  res.status(501).json({ message: "Document upload not implemented yet" });
};

/**
 * Upload video file
 * @route POST /api/files/upload-video
 * @access Private
 * @TODO Implement when video support is needed
 */
const uploadVideo = async (req, res) => {
  // TODO: Implement video upload
  // - Validate video file types (.mp4, .avi, .mov, .wmv)
  // - Add video-specific metadata (duration, resolution)
  // - Store in GridFS with fileType: "video"
  // - Consider video compression/transcoding
  res.status(501).json({ message: "Video upload not implemented yet" });
};

/**
 * Upload audio file
 * @route POST /api/files/upload-audio
 * @access Private
 * @TODO Implement when audio support is needed
 */
const uploadAudio = async (req, res) => {
  // TODO: Implement audio upload
  // - Validate audio file types (.mp3, .wav, .flac, .aac)
  // - Add audio-specific metadata (duration, bitrate)
  // - Store in GridFS with fileType: "audio"
  res.status(501).json({ message: "Audio upload not implemented yet" });
};

/**
 * Get file analytics (download count, etc.)
 * @route GET /api/files/:id/analytics
 * @access Private
 * @TODO Implement when analytics are needed
 */
const getFileAnalytics = async (req, res) => {
  // TODO: Implement file analytics
  // - Track download counts
  // - View history
  // - Popular files
  res.status(501).json({ message: "File analytics not implemented yet" });
};