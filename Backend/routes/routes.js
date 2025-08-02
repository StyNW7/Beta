import express from "express";
import {
  registerUser,
  loginUser,
  changePassword,
} from "../controllers/auth.controller.js";
import { getUserAvatarCollections, getUserProfile, setMainAvatar } from "../controllers/user.controller.js";
import { deleteAvatar, getFileById, uploadAvatar, uploadTemplate, editAvatarInfo } from "../controllers/largefiles.controller.js";
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

//user avatar routes
router.get("/user/avatar/avatar-collection", protect, getUserAvatarCollections);
router.put("/user/avatar/main-avatar/:avatarId", protect, setMainAvatar);
router.put("/user/avatar/edit/:avatarId", protect, editAvatarInfo);

//landmark routes
router.get("/landmark", protect, getAllLandmarks);

//question routes
router.get("/question/:id", protect, getQuestionById);

//files routes
router.post("/files/upload-avatar", protect, upload.single('image'), uploadAvatar); // upload.single move the image file to buffer format and extract metadata
router.post("/files/upload-template", protect, upload.single('image'), uploadTemplate);
router.get("/files/:id", getFileById); 
router.delete("/files/:id", protect, deleteAvatar);


export default router;
