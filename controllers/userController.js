const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to extract user ID from token
const extractUserIdFromToken = (req) => {
    if (!req) {
        return res.status(401).json({ error: 'Access denied: No token provided' });
    }

    const token = req.startsWith('Bearer ') ? req.slice(7, req.length) : req;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.data.id;
};

// Get logged-in user's profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = extractUserIdFromToken(req.header('Authorization'));
        console.log(userId);
        const user = await User.findById(userId).select('-password');
        res.status(200).json({data: user, message: 'User profile fetched successfully'});
    } catch (error) {
        res.status(400).json({ error: 'Error fetching user profile' });
    }
};

// Update logged-in user's profile
exports.updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
    try {
        const userId = extractUserIdFromToken(req.header('Authorization'));
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: 'Error updating profile' });
    }
};

// List all users (Admin only)
exports.listUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching users' });
    }
};
