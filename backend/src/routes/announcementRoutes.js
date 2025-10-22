// backend/src/routes/announcementRoutes.js
import express from "express";
import { 
  getAnnouncements, 
  getAnnouncementById, 
  createAnnouncement, 
  updateAnnouncement, 
  deleteAnnouncement
} from "../controllers/announcementController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getAnnouncements)
  .post(protect, createAnnouncement);

router.route("/:id")
  .get(protect, getAnnouncementById)
  .put(protect, updateAnnouncement)
  .delete(protect, deleteAnnouncement);

export default router;