import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  getSupervisorRequests,
  updateRequestStatus,
  getMyProfile,
  updateMyProfile
} from "../controllers/supervisorController.js";

const router = express.Router();

router.use(protect);
router.use(authorize("supervisor"));

router.get("/me/profile", getMyProfile);
router.patch("/me/profile", updateMyProfile);
router.get("/requests", getSupervisorRequests);
router.put("/requests/:id/status", updateRequestStatus);

export default router;
