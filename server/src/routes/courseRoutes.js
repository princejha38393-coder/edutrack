import express from "express";

import {
  getCourses,
  getCourseById,
  createCourse
} from "../controllers/courseController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);

// Admin Only
router.post("/", protect, adminOnly, createCourse);

export default router;