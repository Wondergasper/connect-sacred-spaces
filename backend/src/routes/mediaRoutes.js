import express from "express";
import { 
  getMedia, 
  getMediaById, 
  createMedia, 
  updateMedia, 
  deleteMedia,
  getPublicMedia
} from "../controllers/mediaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getMedia)
  .post(protect, createMedia);

router.route("/public")
  .get(getPublicMedia);  // Public route for explore page

router.route("/:id")
  .get(protect, getMediaById)
  .put(protect, updateMedia)
  .delete(protect, deleteMedia);

export default router;