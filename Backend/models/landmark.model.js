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
    image: {
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
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      z: { type: Number, required: true },
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Landmark = mongoose.model("Landmark", landmarkSchema);

export default Landmark;
