import express from "express";
import { 
  getChurch, 
  getChurches, 
  createChurch, 
  updateChurch, 
  deleteChurch,
  addMember,
  removeMember
} from "../controllers/churchController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getChurches)
  .post(protect, createChurch);

router.route("/:id")
  .get(protect, getChurch)
  .put(protect, updateChurch)
  .delete(protect, deleteChurch);

router.route("/:id/members")
  .post(protect, addMember)
  .delete(protect, removeMember);

export default router;