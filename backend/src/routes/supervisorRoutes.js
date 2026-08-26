import express from "express";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/supervisorController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me/profile", protect, authorize("supervisor"), getMyProfile);
router.patch("/me/profile", protect, authorize("supervisor"), updateMyProfile);

export default router;