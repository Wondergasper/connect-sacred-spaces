import Media from "../models/Media.js";
import Church from "../models/Church.js";

export const getMedia = async (req, res) => {
  try {
    // Get media for a specific church if churchId is provided, otherwise get public media
    let media;
    if (req.query.churchId) {
      media = await Media.find({ church: req.query.churchId }).populate('uploadedBy', 'firstName lastName');
    } else {
      // Get public media or all media based on user permissions
      media = await Media.find({ isPublic: true }).populate('uploadedBy', 'firstName lastName');
    }
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id).populate('uploadedBy', 'firstName lastName');
    
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMedia = async (req, res) => {
  try {
    const { title, description, type, url, thumbnail, duration, size, church, category, isPublic } = req.body;
    
    const media = new Media({
      title,
      description,
      type,
      url,
      thumbnail,
      duration,
      size,
      church,
      uploadedBy: req.user._id, // The authenticated user uploads the media
      category,
      isPublic: isPublic || false
    });
    
    const createdMedia = await media.save();
    res.status(201).json(createdMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    
    // Check if the user is authorized to update the media
    if (media.uploadedBy.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin' && 
        req.user.role !== 'pastor') {
      return res.status(401).json({ message: "Not authorized to update this media" });
    }
    
    // Update media fields
    media.title = req.body.title || media.title;
    media.description = req.body.description || media.description;
    media.type = req.body.type || media.type;
    media.url = req.body.url || media.url;
    media.thumbnail = req.body.thumbnail || media.thumbnail;
    media.duration = req.body.duration || media.duration;
    media.size = req.body.size || media.size;
    media.church = req.body.church || media.church;
    media.category = req.body.category || media.category;
    media.isPublic = req.body.isPublic !== undefined ? req.body.isPublic : media.isPublic;
    
    const updatedMedia = await media.save();
    res.json(updatedMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    
    // Check if the user is authorized to delete the media
    if (media.uploadedBy.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin' && 
        req.user.role !== 'pastor') {
      return res.status(401).json({ message: "Not authorized to delete this media" });
    }
    
    await media.remove();
    res.json({ message: "Media removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPublicMedia = async (req, res) => {
  try {
    // Get all public media for the explore page
    const media = await Media.find({ isPublic: true })
      .populate('uploadedBy', 'firstName lastName')
      .populate('church', 'name denomination');
    
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};