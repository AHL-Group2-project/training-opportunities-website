import express from "express";
import { getMyProfile, updateMyProfile, submitTrainingRequest } from "../controllers/studentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("student"));

router.get("/me/profile", getMyProfile);
router.patch("/me/profile", updateMyProfile);
router.post("/requests", submitTrainingRequest);

export default router;
