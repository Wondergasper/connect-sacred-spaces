// backend/src/routes/dashboardRoutes.js
import express from "express";
import { getDashboardStats, getDashboardData } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/stats")
  .get(protect, getDashboardStats);

router.route("/")
  .get(protect, getDashboardData);

export default router;