import express from "express";
import { getMyProfile, updateMyProfile } from "../controllers/studentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me/profile", protect, authorize("student"), getMyProfile);
router.patch("/me/profile", protect, authorize("student"), updateMyProfile);

export default router;