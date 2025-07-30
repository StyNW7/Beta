import mongoose from "mongoose";

const landmarkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    yearBuilt: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Landmark = mongoose.model("Landmark", landmarkSchema);

export default Landmark;
