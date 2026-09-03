import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  getMyProfile,
  updateMyProfile,
  getSupervisorDashboard,
  uploadSupervisorAvatar,
  getMyStudents,
  exportMyStudents,
  getStudentDetails,
  assignCompany
} from "../controllers/supervisorController.js";
import { uploadProfileImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("supervisor"));

router.get("/me/profile", getMyProfile);
router.patch("/me/profile", updateMyProfile);
router.post("/me/avatar", uploadProfileImage.single("avatar"), uploadSupervisorAvatar);
router.get("/dashboard", getSupervisorDashboard);

import { getStudentHours, reviewStudentHours, getStudentTrainingState } from "../controllers/supervisorHoursController.js";

router.get("/students", getMyStudents);
router.get("/students/export", exportMyStudents);
router.get("/students/:studentId", getStudentDetails);
router.get("/students/:studentId/training-state", getStudentTrainingState);
router.post("/students/:studentId/assign-company", assignCompany);

// Hours review routes
router.get("/students/:studentId/hours", getStudentHours);
router.patch("/hours/:hourId/review", reviewStudentHours);

export default router;