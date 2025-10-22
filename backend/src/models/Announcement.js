// backend/src/models/Announcement.js
import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  church: { type: mongoose.Schema.Types.ObjectId, ref: "Church", required: true },
  priority: { 
    type: String, 
    enum: ["low", "normal", "medium", "high"], 
    default: "normal" 
  },
  pinned: { type: Boolean, default: false },
  scheduledAt: { type: Date },
  expiresAt: { type: Date },
}, { timestamps: true });

export default mongoose.model("Announcement", announcementSchema);