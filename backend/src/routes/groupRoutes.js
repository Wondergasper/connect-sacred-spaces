import express from "express";
import { 
  getGroups, 
  getGroupById, 
  createGroup, 
  updateGroup, 
  deleteGroup,
  joinGroup,
  leaveGroup,
  addAdmin
} from "../controllers/groupController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getGroups)
  .post(protect, createGroup);

router.route("/:id")
  .get(protect, getGroupById)
  .put(protect, updateGroup)
  .delete(protect, deleteGroup);

router.route("/:id/join")
  .post(protect, joinGroup);

router.route("/:id/leave")
  .post(protect, leaveGroup);

router.route("/:id/admins")
  .post(protect, addAdmin);

export default router;