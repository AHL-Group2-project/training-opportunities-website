import express from "express";
import { loginUser, changePassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { z } from "zod";

const router = express.Router();

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }).passthrough(),
});

router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/change-password", protect, changePassword);

export default router;
