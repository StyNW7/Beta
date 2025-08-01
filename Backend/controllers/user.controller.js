import User from "../models/user.model.js";
import Avatar from "../models/avatar.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserAvatarCollections = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query; // REMOVED category parameter
    
    // Build query (REMOVED category filter)
    const query = { 
      userId: req.user.userId, 
      isActive: true 
    };

    // Efficient pagination
    const avatars = await Avatar.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) || 20)
      .skip((page - 1) * (Number(limit) || 20))
      .select('-__v'); // Exclude version field

    const total = await Avatar.countDocuments(query);

    // Format response (REMOVED category references)
    const avatarsWithUrls = avatars.map(avatar => ({
      id: avatar._id,
      fileId: avatar.fileId,
      originalName: avatar.originalName,
      description: avatar.description,
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

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};