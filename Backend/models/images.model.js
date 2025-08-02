import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
    default: "profile",
    index: true,
    enum: ["profile", "template", "ai-generated", "other"],
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
  timestamps: true,
});

// Compound indexes for efficient queries
imageSchema.index({ userId: 1, isActive: 1 });
imageSchema.index({ userId: 1, category: 1 });
imageSchema.index({ userId: 1, isActive: 1, category: 1 });

// Virtual for image URL
imageSchema.virtual('imageUrl').get(function() {
  return `/api/files/${this.fileId}`;
});

imageSchema.set('toJSON', { virtuals: true });

const Images = mongoose.model("Images", imageSchema);
export default Images;