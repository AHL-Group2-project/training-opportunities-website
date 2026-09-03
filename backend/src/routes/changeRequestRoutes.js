import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createChangeRequest,
  getMyChangeRequests,
  getChangeRequests,
  reviewChangeRequest,
} from "../controllers/changeRequestController.js";

const router = express.Router();

router.post("/", protect, authorize("supervisor"), createChangeRequest);
router.get("/mine", protect, authorize("supervisor"), getMyChangeRequests);
router.get("/", protect, authorize("admin"), getChangeRequests);
router.patch("/:id", protect, authorize("admin"), reviewChangeRequest);

export default router;