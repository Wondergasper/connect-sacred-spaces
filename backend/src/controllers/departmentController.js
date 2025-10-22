// backend/src/controllers/departmentController.js
import Department from "../models/Department.js";
import User from "../models/User.js";
import Church from "../models/Church.js";

export const getDepartments = async (req, res) => {
  try {
    // Get departments for the user's church
    const departments = await Department.find({ church: req.user.church })
      .populate('leader', 'firstName lastName')
      .populate('members', 'firstName lastName');
    
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('leader', 'firstName lastName')
      .populate('members', 'firstName lastName');
    
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    
    // Check if the department is for the user's church
    if (department.church.toString() !== req.user.church.toString()) {
      return res.status(401).json({ message: "Not authorized to view this department" });
    }
    
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name, description, leader, icon } = req.body;
    
    // Check if user has permission to create departments
    const allowedRoles = ['admin', 'pastor'];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({ message: "Not authorized to create departments" });
    }
    
    const department = new Department({
      name,
      description,
      church: req.user.church, // Use the user's church
      leader,
      icon,
    });
    
    const createdDepartment = await department.save();
    res.status(201).json(createdDepartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    
    // Check if the user is authorized to update the department
    const allowedRoles = ['admin', 'pastor'];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({ message: "Not authorized to update this department" });
    }
    
    // Also check if the department belongs to the user's church
    if (department.church.toString() !== req.user.church.toString()) {
      return res.status(401).json({ message: "Not authorized to update this department" });
    }
    
    // Update department fields
    department.name = req.body.name || department.name;
    department.description = req.body.description || department.description;
    department.leader = req.body.leader || department.leader;
    department.icon = req.body.icon || department.icon;
    department.isActive = req.body.isActive !== undefined ? req.body.isActive : department.isActive;
    
    const updatedDepartment = await department.save();
    res.json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    
    // Check if the user is authorized to delete the department
    const allowedRoles = ['admin', 'pastor'];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({ message: "Not authorized to delete this department" });
    }
    
    // Also check if the department belongs to the user's church
    if (department.church.toString() !== req.user.church.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this department" });
    }
    
    await department.remove();
    res.json({ message: "Department removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    
    if (!department || !user) {
      return res.status(404).json({ message: "Department or User not found" });
    }
    
    // Check if the department belongs to the user's church
    if (department.church.toString() !== req.user.church.toString()) {
      return res.status(401).json({ message: "Not authorized to modify this department" });
    }
    
    // Check if user is already a member
    if (!department.members.includes(req.body.userId)) {
      department.members.push(req.body.userId);
      await department.save();
    }
    
    await department.populate('members', 'firstName lastName');
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeMember = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    
    // Check if the department belongs to the user's church
    if (department.church.toString() !== req.user.church.toString()) {
      return res.status(401).json({ message: "Not authorized to modify this department" });
    }
    
    department.members = department.members.filter(member => member.toString() !== req.body.userId);
    await department.save();
    
    await department.populate('members', 'firstName lastName');
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};