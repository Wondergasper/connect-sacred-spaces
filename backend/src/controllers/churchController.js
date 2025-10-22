import Church from "../models/Church.js";
import User from "../models/User.js";

export const getChurch = async (req, res) => {
  try {
    const church = await Church.findById(req.params.id).populate('pastor');
    if (!church) {
      return res.status(404).json({ message: "Church not found" });
    }
    res.json(church);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChurches = async (req, res) => {
  try {
    const churches = await Church.find({});
    res.json(churches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createChurch = async (req, res) => {
  try {
    const { denomination, name, location, description } = req.body;
    
    const church = new Church({
      denomination,
      name,
      location,
      description
    });
    
    const createdChurch = await church.save();
    res.status(201).json(createdChurch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateChurch = async (req, res) => {
  try {
    const church = await Church.findById(req.params.id);
    
    if (!church) {
      return res.status(404).json({ message: "Church not found" });
    }
    
    // Update church fields
    church.denomination = req.body.denomination || church.denomination;
    church.name = req.body.name || church.name;
    church.location = req.body.location || church.location;
    church.description = req.body.description || church.description;
    church.pastor = req.body.pastor || church.pastor;
    
    const updatedChurch = await church.save();
    res.json(updatedChurch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteChurch = async (req, res) => {
  try {
    const church = await Church.findById(req.params.id);
    
    if (!church) {
      return res.status(404).json({ message: "Church not found" });
    }
    
    await church.remove();
    res.json({ message: "Church removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const church = await Church.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    
    if (!church || !user) {
      return res.status(404).json({ message: "Church or User not found" });
    }
    
    if (!church.members.includes(req.body.userId)) {
      church.members.push(req.body.userId);
      await church.save();
    }
    
    res.json(church);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeMember = async (req, res) => {
  try {
    const church = await Church.findById(req.params.id);
    
    if (!church) {
      return res.status(404).json({ message: "Church not found" });
    }
    
    church.members = church.members.filter(member => member.toString() !== req.body.userId);
    await church.save();
    
    res.json(church);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};