import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  avatar_collection: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Avatar"
  }],
  main_avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Avatar",
    required: false, // User might not have a main avatar initially
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Virtual for main avatar URL
userSchema.virtual('mainAvatarUrl').get(function() {
  return this.main_avatar ? `/api/files/${this.main_avatar.fileId || this.main_avatar}` : null;
});

userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model("User", userSchema);

export default User;
