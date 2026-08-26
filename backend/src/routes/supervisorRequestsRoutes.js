import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  getMyRequests,
  updateRequestStatus,
} from "../controllers/supervisorRequestsController.js";

const router = express.Router();

router.use(protect);
router.use(authorize("supervisor"));

router.get("/requests", getMyRequests);
router.put("/requests/:id/status", updateRequestStatus);

export default router;