// backend/src/controllers/announcementController.js
import Announcement from "../models/Announcement.js";
import User from "../models/User.js";
import Church from "../models/Church.js";

export const getAnnouncements = async (req, res) => {
  try {
    // Get announcements for a specific church if churchId is provided, otherwise get all
    const { churchId, limit } = req.query;
    let query = {};
    
    if (churchId) {
      query.church = churchId;
    } else {
      // If no specific church requested, default to user's church
      query.church = req.user.church;
    }
    
    // Get announcements sorted by pinned status and creation date
    const announcements = await Announcement.find(query)
      .populate('author', 'firstName lastName')
      .populate('church', 'name')
      .sort({ pinned: -1, createdAt: -1 })
      .limit(limit ? parseInt(limit) : 0); // 0 means no limit
    
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('author', 'firstName lastName')
      .populate('church', 'name');
    
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    
    // Check if the announcement is for the user's church
    if (announcement.church._id.toString() !== req.user.church.toString()) {
      return res.status(401).json({ message: "Not authorized to view this announcement" });
    }
    
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, priority, pinned, scheduledAt, expiresAt } = req.body;
    
    // Check if user has permission to create announcements
    const allowedRoles = ['admin', 'pastor', 'deacon', 'leader'];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({ message: "Not authorized to create announcements" });
    }
    
    const announcement = new Announcement({
      title,
      content,
      author: req.user._id,
      church: req.user.church, // Use the user's church
      priority: priority || 'normal',
      pinned: pinned || false,
      scheduledAt,
      expiresAt
    });
    
    const createdAnnouncement = await announcement.save();
    res.status(201).json(createdAnnouncement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    
    // Check if the user is authorized to update the announcement
    const allowedRoles = ['admin', 'pastor', 'deacon', 'leader'];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({ message: "Not authorized to update this announcement" });
    }
    
    // Also check if the announcement belongs to the user's church
    if (announcement.church.toString() !== req.user.church.toString()) {
      return res.status(401).json({ message: "Not authorized to update this announcement" });
    }
    
    // Update announcement fields
    announcement.title = req.body.title || announcement.title;
    announcement.content = req.body.content || announcement.content;
    announcement.priority = req.body.priority || announcement.priority;
    announcement.pinned = req.body.pinned !== undefined ? req.body.pinned : announcement.pinned;
    announcement.scheduledAt = req.body.scheduledAt || announcement.scheduledAt;
    announcement.expiresAt = req.body.expiresAt || announcement.expiresAt;
    
    const updatedAnnouncement = await announcement.save();
    res.json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    
    // Check if the user is authorized to delete the announcement
    const allowedRoles = ['admin', 'pastor', 'deacon', 'leader'];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({ message: "Not authorized to delete this announcement" });
    }
    
    // Also check if the announcement belongs to the user's church
    if (announcement.church.toString() !== req.user.church.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this announcement" });
    }
    
    await announcement.remove();
    res.json({ message: "Announcement removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};