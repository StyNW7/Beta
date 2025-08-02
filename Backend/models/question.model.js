import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  imageSrc: String,
  hint: String,
  correctAnswer: String,
  description: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question
