// backend/src/controllers/dashboardController.js
import User from "../models/User.js";
import Event from "../models/Event.js";
import Donation from "../models/Donation.js";
import Media from "../models/Media.js";
import Group from "../models/Group.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Get stats for the user's church or denomination
    // This would aggregate data from multiple collections
    
    // Get member count for the user's church
    const memberCount = await User.countDocuments({ 
      church: req.user.church 
    });
    
    // Get upcoming events count for the user's church
    const upcomingEventsCount = await Event.countDocuments({ 
      church: req.user.church,
      startDate: { $gte: new Date() }
    });
    
    // Get donations for the user's church in the current month
    const startDate = new Date();
    startDate.setDate(1); // First day of month
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0); // Last day of month
    endDate.setHours(23, 59, 59, 999);
    
    const monthlyDonations = await Donation.aggregate([
      {
        $match: {
          church: req.user.church,
          createdAt: { $gte: startDate, $lte: endDate },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);
    
    const donationStats = monthlyDonations[0] || { totalAmount: 0, count: 0 };
    
    // Get recent messages/groups count
    const groupCount = await Group.countDocuments({ 
      church: req.user.church 
    });
    
    res.json({
      activeMembers: memberCount,
      upcomingEvents: upcomingEventsCount,
      monthlyDonations: donationStats.totalAmount,
      newGroups: groupCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    // Get upcoming events for the user's church
    const upcomingEvents = await Event.find({ 
      church: req.user.church,
      startDate: { $gte: new Date() }
    })
    .sort({ startDate: 1 })
    .limit(5)
    .populate('createdBy', 'firstName lastName');
    
    // Get recent media for the user's church
    const recentMedia = await Media.find({ 
      church: req.user.church
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('uploadedBy', 'firstName lastName');
    
    // Get groups for the user's church
    const groups = await Group.find({ 
      church: req.user.church
    })
    .limit(5)
    .populate('createdBy', 'firstName lastName');
    
    res.json({
      upcomingEvents,
      recentMedia,
      groups
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};