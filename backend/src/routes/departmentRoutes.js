// backend/src/routes/departmentRoutes.js
import express from "express";
import { 
  getDepartments, 
  getDepartmentById, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment,
  addMember,
  removeMember
} from "../controllers/departmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getDepartments)
  .post(protect, createDepartment);

router.route("/:id")
  .get(protect, getDepartmentById)
  .put(protect, updateDepartment)
  .delete(protect, deleteDepartment);

router.route("/:id/members")
  .post(protect, addMember)
  .delete(protect, removeMember);

export default router;