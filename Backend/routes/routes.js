import express from "express";
import {
  registerUser,
  loginUser,
  changePassword,
} from "../controllers/auth.controller.js";
import { getUserProfile } from "../controllers/user.controller.js";
import { protect } from "../middleware/protect.js";
import { getAllLandmarks, getLandmarkById } from "../controllers/landmark.controller.js";
import { getQuestionById, getRandomQuestions } from "../controllers/question.controller.js";

const router = express.Router();

//auth routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.put("/auth/change-password/:id", changePassword);

//user routes
router.get("/user/profile", protect, getUserProfile);

//landmark routes
router.get("/landmark", protect, getAllLandmarks);
router.get("/landmark/:id", protect, getLandmarkById);

//question routes
router.get("/question/random", getRandomQuestions); //route order matters
router.get("/question/:id", protect, getQuestionById)

export default router;
