import mongoose from "mongoose";

const churchSchema = new mongoose.Schema({
  denomination: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
  pastor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default mongoose.model("Church", churchSchema);