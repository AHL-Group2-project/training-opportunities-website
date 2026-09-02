import express from "express";
import { getMyProfile, updateMyProfile, submitTrainingRequest, getMyRequests, getPublicStudents, getPublicStudentById, uploadStudentAvatar, uploadStudentDocument } from "../controllers/studentController.js";
import { getMyHours, submitMyHoursBulk, getMyTrainingState } from "../controllers/studentHoursController.js";
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
router.get("/requests", getMyRequests);
router.post("/requests", submitTrainingRequest);

// Upload routes
router.post("/me/avatar", uploadProfileImage.single("avatar"), uploadStudentAvatar);
router.post("/me/document", uploadDocument.single("document"), uploadStudentDocument);

// Hours routes
router.get("/me/training-state", getMyTrainingState);
router.get("/me/hours", getMyHours);
router.post("/me/hours/bulk", submitMyHoursBulk);

export default router;
