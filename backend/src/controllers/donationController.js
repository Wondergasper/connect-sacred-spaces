import Donation from "../models/Donation.js";
import User from "../models/User.js";

export const getDonations = async (req, res) => {
  try {
    // If user is an admin or pastor, they can get all donations for their church
    // Otherwise, only get donations by the current user
    let donations;
    if (req.user.role === 'admin' || req.user.role === 'pastor') {
      // Get donations for the user's church
      donations = await Donation.find({}).populate('donor', 'firstName lastName email');
    } else {
      // Get donations by the current user
      donations = await Donation.find({ donor: req.user._id }).populate('donor', 'firstName lastName email');
    }
    
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('donor', 'firstName lastName email');
    
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDonation = async (req, res) => {
  try {
    const { amount, donationType, reference, paymentProvider } = req.body;
    
    const donation = new Donation({
      amount,
      donor: req.user._id, // The authenticated user is the donor
      donationType,
      reference,
      paymentProvider,
      status: 'completed' // Assuming payment is already processed
    });
    
    const createdDonation = await donation.save();
    res.status(201).json(createdDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    
    // Check if the user is authorized to update the donation
    if (donation.donor.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin' && 
        req.user.role !== 'pastor') {
      return res.status(401).json({ message: "Not authorized to update this donation" });
    }
    
    // Update donation fields
    donation.amount = req.body.amount || donation.amount;
    donation.donationType = req.body.donationType || donation.donationType;
    donation.status = req.body.status || donation.status;
    
    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    
    // Check if the user is authorized to delete the donation
    if (donation.donor.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin' && 
        req.user.role !== 'pastor') {
      return res.status(401).json({ message: "Not authorized to delete this donation" });
    }
    
    await donation.remove();
    res.json({ message: "Donation removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDonationStats = async (req, res) => {
  try {
    // Get donation statistics for the user's church
    const totalDonations = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalCount: { $sum: 1 },
          averageAmount: { $avg: "$amount" }
        }
      }
    ]);
    
    const donationByType = await Donation.aggregate([
      {
        $group: {
          _id: "$donationType",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      totalStats: totalDonations[0] || { totalAmount: 0, totalCount: 0, averageAmount: 0 },
      byType: donationByType
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};