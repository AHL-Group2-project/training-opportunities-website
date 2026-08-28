import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  getSupervisorRequests,
  updateRequestStatus,
  getMyProfile,
  updateMyProfile,
  getSupervisorDashboard,
  uploadSupervisorAvatar
} from "../controllers/supervisorController.js";
import { uploadProfileImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("supervisor"));

router.get("/me/profile", getMyProfile);
router.patch("/me/profile", updateMyProfile);
router.post("/me/avatar", uploadProfileImage.single("avatar"), uploadSupervisorAvatar);
router.get("/requests", getSupervisorRequests);
router.put("/requests/:id/status", updateRequestStatus);
router.get("/dashboard", getSupervisorDashboard);

export default router;
