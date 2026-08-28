import express from "express";
import { getMyProfile, updateMyProfile, submitTrainingRequest, getPublicStudents, getPublicStudentById, uploadStudentAvatar, uploadStudentDocument } from "../controllers/studentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { uploadProfileImage, uploadDocument } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public route must be placed before protect middleware
router.get("/public", getPublicStudents);
router.get("/public/:id", getPublicStudentById);

router.use(protect);
router.use(authorize("student"));

router.get("/me/profile", getMyProfile);
router.patch("/me/profile", updateMyProfile);
router.post("/requests", submitTrainingRequest);

// Upload routes
router.post("/me/avatar", uploadProfileImage.single("avatar"), uploadStudentAvatar);
router.post("/me/document", uploadDocument.single("document"), uploadStudentDocument);

export default router;
