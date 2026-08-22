import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  getSupervisorRequests,
  updateRequestStatus,
} from "../controllers/supervisorController.js";

const router = express.Router();

router.use(protect);
router.use(authorize("supervisor"));

router.get("/requests", getSupervisorRequests);
router.put("/requests/:id/status", updateRequestStatus);

export default router;
