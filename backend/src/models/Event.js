import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  church: { type: mongoose.Schema.Types.ObjectId, ref: "Church" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isPublic: { type: Boolean, default: false }, // Whether the event appears in Explore
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);