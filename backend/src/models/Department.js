// backend/src/models/Department.js
import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  church: { type: mongoose.Schema.Types.ObjectId, ref: "Church", required: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  icon: String, // Name of the icon to display
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Department", departmentSchema);