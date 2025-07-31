import mongoose from "mongoose";

const questionAnsweredSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    answerGiven: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    responseTime: {
      type: Number, // seconds
      required: true,
    },
  },
  { _id: false }
);

const guessCoordinatesSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const locationGuessSchema = new mongoose.Schema(
  {
    landmarkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Landmark",
      required: true,
    },
    guessCoordinates: {
      type: guessCoordinatesSchema,
      required: true,
    },
    distanceFromCorrect: {
      type: Number, // meters
      required: true,
    },
  },
  { _id: false }
);

const gameSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    questionsAnswered: {
      type: [questionAnsweredSchema],
      required: true,
      default: [],
    },
    locationGuesses: {
      type: [locationGuessSchema],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const GameSession = mongoose.model("GameSession", gameSessionSchema);

export default GameSession;
