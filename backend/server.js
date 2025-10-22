import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./src/middleware/errorHandler.js";

import authRoutes from "./src/routes/authRoutes.js";
import churchRoutes from "./src/routes/churchRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import donationRoutes from "./src/routes/donationRoutes.js";
import mediaRoutes from "./src/routes/mediaRoutes.js";
import groupRoutes from "./src/routes/groupRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import announcementRoutes from "./src/routes/announcementRoutes.js";
import departmentRoutes from "./src/routes/departmentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/church", churchRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/departments", departmentRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));