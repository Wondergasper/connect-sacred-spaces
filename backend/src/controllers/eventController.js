import Event from "../models/Event.js";
import Church from "../models/Church.js";

export const getEvents = async (req, res) => {
  try {
    // Get events for a specific church if churchId is provided, otherwise get public events
    let events;
    if (req.query.churchId) {
      events = await Event.find({ church: req.query.churchId }).populate('createdBy', 'firstName lastName').populate('attendees', 'firstName lastName');
    } else {
      // Get public events or all events based on user permissions
      events = await Event.find({ isPublic: true }).populate('createdBy', 'firstName lastName').populate('attendees', 'firstName lastName');
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'firstName lastName').populate('attendees', 'firstName lastName');
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, description, location, startDate, endDate, church, isPublic } = req.body;
    
    const event = new Event({
      title,
      description,
      location,
      startDate,
      endDate,
      church,
      createdBy: req.user._id, // The authenticated user creates the event
      isPublic: isPublic || false
    });
    
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    // Check if the user is authorized to update the event
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this event" });
    }
    
    // Update event fields
    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.location = req.body.location || event.location;
    event.startDate = req.body.startDate || event.startDate;
    event.endDate = req.body.endDate || event.endDate;
    event.church = req.body.church || event.church;
    event.isPublic = req.body.isPublic !== undefined ? req.body.isPublic : event.isPublic;
    
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    // Check if the user is authorized to delete the event
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this event" });
    }
    
    await event.remove();
    res.json({ message: "Event removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    // Check if user is already attending
    const isAttending = event.attendees.some(attendee => attendee.toString() === req.user._id.toString());
    
    if (isAttending) {
      // Remove user from attendees
      event.attendees = event.attendees.filter(attendee => attendee.toString() !== req.user._id.toString());
    } else {
      // Add user to attendees
      event.attendees.push(req.user._id);
    }
    
    await event.save();
    
    // Populate attendees to return updated list
    await event.populate('attendees', 'firstName lastName email');
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};