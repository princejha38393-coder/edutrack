import express from "express";
import { getOverview } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/overview",
  protect,
  adminOnly,
  getOverview
);

export default router;