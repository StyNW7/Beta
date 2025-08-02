import User from "../models/user.model.js";
import Images from "../models/images.model.js";
import mongoose from "mongoose";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = user.toObject({virtuals: true});

    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserAvatarCollections = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const query = { 
      userId: req.user.userId, 
      category: { $in: ["profile","ai-generated"] },
      isActive: true 
    };

    // Efficient pagination
    const avatars = await Images.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) || 20)
      .skip((page - 1) * (Number(limit) || 20))
      .select('-__v'); // Exclude version field

    const total = await Images.countDocuments(query);

    const avatarsWithUrls = avatars.map(avatar => ({
      id: avatar._id,
      fileId: avatar.fileId,
      originalName: avatar.originalName,
      description: avatar.description,
      category: avatar.category,
      size: avatar.size,
      formattedSize: formatFileSize(avatar.size),
      mimeType: avatar.mimeType,
      downloadCount: avatar.downloadCount,
      uploadDate: avatar.createdAt,
      imageUrl: avatar.imageUrl,
    }));

    res.status(200).json({
      avatars: avatarsWithUrls,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error("Error fetching avatar collections:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Set an avatar as the main/default avatar
 * @route PUT /api/user/main-avatar/:avatarId
 * @access Private
 */
export const setMainAvatar = async (req, res) => {
  try {
    const { avatarId } = req.params;
    const userId = req.user.userId;

    // Validate avatar ID
    if (!mongoose.Types.ObjectId.isValid(avatarId)) {
      return res.status(400).json({ message: "Invalid avatar ID" });
    }

    // Check if avatar exists and belongs to user
    const avatar = await Images.findOne({ _id: avatarId, userId: userId });
    if (!avatar) {
      return res.status(404).json({ message: "Avatar not found or doesn't belong to user" });
    }

    // Update user's main avatar
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { main_avatar: avatarId },
      { new: true }
    ).populate('main_avatar');

    res.status(200).json({
      message: "Main avatar updated successfully",
      mainAvatar: {
        id: updatedUser.main_avatar._id,
        originalName: updatedUser.main_avatar.originalName,
        imageUrl: `/api/files/${updatedUser.main_avatar.fileId}`,
      }
    });

  } catch (error) {
    console.error("Error setting main avatar:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};