import express from "express";
import { 
  getDonations, 
  getDonationById, 
  createDonation, 
  updateDonation, 
  deleteDonation,
  getDonationStats
} from "../controllers/donationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getDonations)
  .post(protect, createDonation);

router.route("/stats")
  .get(protect, getDonationStats);

router.route("/:id")
  .get(protect, getDonationById)
  .put(protect, updateDonation)
  .delete(protect, deleteDonation);

export default router;