import express from "express";
import {
  registerUser,
  loginUser,
  changePassword,
} from "../controllers/auth.controller.js";
import { getUserAvatarCollections, getUserProfile } from "../controllers/user.controller.js";
import { deleteFile, getFileById } from "../controllers/largefiles.controller.js";
import { protect } from "../middleware/protect.js";
import { getAllLandmarks } from "../controllers/landmark.controller.js";
import { getQuestionById } from "../controllers/question.controller.js";

const router = express.Router();

//auth routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.put("/auth/change-password/:id", changePassword);

//user routes
router.get("/user/profile", protect, getUserProfile);
router.get("/user/avatar-collection", protect, getUserAvatarCollections);

//landmark routes
router.get("/landmark", protect, getAllLandmarks);

//question routes
router.get("/question/:id", protect, getQuestionById);

//files routes
router.get("/files/:id", getFileById); 
router.get("/files/:id/metadata", protect, getFileMetadata);
router.delete("/files/:id", protect, deleteFile);


export default router;
