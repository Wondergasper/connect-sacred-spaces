import Group from "../models/Group.js";
import User from "../models/User.js";

export const getGroups = async (req, res) => {
  try {
    // Get groups based on query parameters
    let groups;
    if (req.query.churchId) {
      // Get groups for a specific church
      groups = await Group.find({ church: req.query.churchId })
        .populate('createdBy', 'firstName lastName')
        .populate('members', 'firstName lastName');
    } else {
      // Get all groups the user is a member of
      groups = await Group.find({ members: { $in: [req.user._id] } })
        .populate('createdBy', 'firstName lastName')
        .populate('members', 'firstName lastName');
    }
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('createdBy', 'firstName lastName')
      .populate('members', 'firstName lastName')
      .populate('admins', 'firstName lastName');
    
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    
    // Check if the group is private/secret and if the user is a member
    if ((group.privacy === 'private' || group.privacy === 'secret') && 
        !group.members.some(member => member._id.toString() === req.user._id.toString())) {
      return res.status(401).json({ message: "Not authorized to view this group" });
    }
    
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGroup = async (req, res) => {
  try {
    const { name, description, church, privacy, category } = req.body;
    
    const group = new Group({
      name,
      description,
      church,
      createdBy: req.user._id, // The authenticated user creates the group
      members: [req.user._id], // Creator is automatically a member
      admins: [req.user._id],  // Creator is automatically an admin
      privacy: privacy || 'public',
      category
    });
    
    const createdGroup = await group.save();
    res.status(201).json(createdGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    
    // Check if the user is authorized to update the group (must be an admin)
    if (!group.admins.some(admin => admin.toString() === req.user._id.toString())) {
      return res.status(401).json({ message: "Not authorized to update this group" });
    }
    
    // Update group fields
    group.name = req.body.name || group.name;
    group.description = req.body.description || group.description;
    group.church = req.body.church || group.church;
    group.privacy = req.body.privacy || group.privacy;
    group.category = req.body.category || group.category;
    
    const updatedGroup = await group.save();
    res.json(updatedGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    
    // Check if the user is authorized to delete the group (must be the creator)
    if (group.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this group" });
    }
    
    await group.remove();
    res.json({ message: "Group removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    
    // Check if the group is private/secret and if we need admin approval
    if (group.privacy === 'secret') {
      return res.status(401).json({ message: "Cannot join secret groups directly" });
    }
    
    // Check if user is already a member
    const isMember = group.members.some(member => member.toString() === req.user._id.toString());
    
    if (!isMember) {
      group.members.push(req.user._id);
      await group.save();
    }
    
    await group.populate('members', 'firstName lastName');
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const leaveGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    
    // Remove user from members
    group.members = group.members.filter(member => member.toString() !== req.user._id.toString());
    
    // If user is an admin, remove them from admins too
    if (group.admins.some(admin => admin.toString() === req.user._id.toString())) {
      // If the user is the last admin, prevent them from leaving
      if (group.admins.length === 1) {
        return res.status(400).json({ message: "Cannot leave group - a group needs at least one admin" });
      }
      group.admins = group.admins.filter(admin => admin.toString() !== req.user._id.toString());
    }
    
    await group.save();
    await group.populate('members', 'firstName lastName');
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addAdmin = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    
    if (!group || !user) {
      return res.status(404).json({ message: "Group or User not found" });
    }
    
    // Check if the current user is an admin
    if (!group.admins.some(admin => admin.toString() === req.user._id.toString())) {
      return res.status(401).json({ message: "Not authorized to add admins to this group" });
    }
    
    // Check if user is already an admin
    if (group.admins.some(admin => admin.toString() === req.body.userId)) {
      return res.status(400).json({ message: "User is already an admin" });
    }
    
    // Make sure the user is a member before adding as admin
    if (!group.members.some(member => member.toString() === req.body.userId)) {
      group.members.push(req.body.userId);
    }
    
    group.admins.push(req.body.userId);
    await group.save();
    
    await group.populate('members', 'firstName lastName');
    await group.populate('admins', 'firstName lastName');
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};