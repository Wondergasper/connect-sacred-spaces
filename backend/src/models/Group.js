import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  church: { type: mongoose.Schema.Types.ObjectId, ref: "Church" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  privacy: { 
    type: String, 
    enum: ["public", "private", "secret"], 
    default: "public" 
  },
  category: String, // e.g., "youth", "prayer", "worship", "bible-study"
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Group", groupSchema);