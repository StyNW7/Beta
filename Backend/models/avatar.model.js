import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // Important for performance
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true, // GridFS file ID
  },
  originalName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  size: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

// Compound index for efficient queries
avatarSchema.index({ userId: 1, isActive: 1 });
avatarSchema.index({ userId: 1, category: 1 });

// Virtual for image URL
avatarSchema.virtual('imageUrl').get(function() {
  return `/api/files/${this.fileId}`;
});

avatarSchema.set('toJSON', { virtuals: true });

const Avatar = mongoose.model("Avatar", avatarSchema);
export default Avatar;