import mongoose from "mongoose";

const answerCoordinatesSchema = new mongoose.Schema({
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
}, { _id: false });

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    questionDescription: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    answerCoordinates: {
      type: answerCoordinatesSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
