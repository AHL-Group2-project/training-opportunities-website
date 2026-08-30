import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { getMyProfile, updateMyProfile } from "../controllers/adminController.js";

const router = express.Router();

router.get("/me", protect, authorize("admin"), getMyProfile);
router.patch("/me/profile", protect, authorize("admin"), updateMyProfile);

export default router;