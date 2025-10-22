import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  church: { type: mongoose.Schema.Types.ObjectId, ref: "Church" },
  donationType: { 
    type: String, 
    enum: ["tithe", "offering", "thanksgiving", "project"], 
    required: true 
  },
  reference: { type: String, required: true }, // Payment reference
  status: { 
    type: String, 
    enum: ["pending", "completed", "failed"], 
    default: "pending" 
  },
  paymentProvider: String, // Paystack, Flutterwave, etc
}, { timestamps: true });

export default mongoose.model("Donation", donationSchema);