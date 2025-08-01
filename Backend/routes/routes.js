import express from "express";
import {
  registerUser,
  loginUser,
  changePassword,
} from "../controllers/auth.controller.js";
import { getUserAvatarCollections, getUserProfile, setMainAvatar } from "../controllers/user.controller.js";
import { getUserAvatarCollections, getUserProfile } from "../controllers/user.controller.js";
import { deleteFile, getFileById } from "../controllers/largefiles.controller.js";
import { protect } from "../middleware/protect.js";
import upload from "../middleware/upload.js";
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
router.put("/user/main-avatar/:avatarId", protect, setMainAvatar);

//landmark routes
router.get("/landmark", protect, getAllLandmarks);

//question routes
router.get("/question/:id", protect, getQuestionById);

//files routes
router.post("/files/upload-image", protect, upload.single('image'), uploadAvatar);
router.get("/files/:id", getFileById); 
router.delete("/files/:id", protect, deleteFile);


export default router;
