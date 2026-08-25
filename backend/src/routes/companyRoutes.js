import express from "express";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/companyController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me/profile", protect, authorize("company"), getMyProfile);
router.patch("/me/profile", protect, authorize("company"), updateMyProfile);

export default router;