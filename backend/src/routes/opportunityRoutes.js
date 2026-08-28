import express from "express";
import {
  getOpportunities,
  createOpportunity,
  getCompanyOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
  restoreOpportunity,
  getCompanyOpportunityById,

} from "../controllers/opportunityController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getOpportunities);

router.post(
  "/",
  protect,
  authorize("company", "supervisor"),
  createOpportunity
);

router.get(
  "/company/me",
  protect,
  authorize("company"),
  getCompanyOpportunities
);
router.get(
  "/company/me/:id",
  protect,
  authorize("company"),
  getCompanyOpportunityById,
);

router.get("/:id", getOpportunityById);

router.put(
  "/:id",
  protect,
  authorize("company", "supervisor", "admin"),
  updateOpportunity
);
router.delete(
  "/:id",
  protect,
  authorize("company", "supervisor", "admin"),
  deleteOpportunity
);
router.patch(
  "/:id/restore",
  protect,
  authorize("company", "supervisor", "admin"),
  restoreOpportunity,
);
export default router;
