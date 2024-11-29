const Announcement = require('../models/Announcement');

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single announcement by ID
exports.getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.status(200).json(announcement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
    const announcement = new Announcement({
        title: req.body.title,
        message: req.body.message,
        userId: req.body.userId,
    });

    try {
        const newAnnouncement = await announcement.save();
        res.status(201).json(newAnnouncement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing announcement
exports.updateAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        announcement.title = req.body.title || announcement.title;
        announcement.message = req.body.message || announcement.message;
        announcement.userId = req.body.userId || announcement.userId;

        const updatedAnnouncement = await announcement.save();
        res.status(200).json(updatedAnnouncement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a notification
exports.deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!Announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        await announcement.remove();
        res.status(200).json({ message: 'Announcement deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};