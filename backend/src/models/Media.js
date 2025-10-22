import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { 
    type: String, 
    enum: ["sermon", "book", "music", "image", "video"], 
    required: true 
  },
  url: { type: String, required: true },
  thumbnail: String,
  duration: String, // For audio/video content
  size: Number, // File size in bytes
  church: { type: mongoose.Schema.Types.ObjectId, ref: "Church" },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isPublic: { type: Boolean, default: false }, // Whether appears in Explore
  category: String, // For filtering (e.g., "worship", "teaching", "testimony")
}, { timestamps: true });

export default mongoose.model("Media", mediaSchema);