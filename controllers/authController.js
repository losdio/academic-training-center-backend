const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const user = new User({ name, username, email, password });
        await user.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
};

exports.registerUserTest = async (req, res) => {
    const { name, username, email, password, role } = req.body;
    try {
        const user = new User({ name, username, email, password, role });
        await user.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const payload = {
            iss: "ATC",                  // Issuer
            sub: user.id,                   // Subject (e.g., user ID)
            aud: "https://academic-training-center-backend.onrender.com",             // Audience
            exp: Math.floor(Date.now() / 1000) + (60 * 30), // Expiration time (1 hour from now)
            iat: Math.floor(Date.now() / 1000),            // Issued at
            id: user.id,             // Custom claim: User ID
            role: user.role,       // Custom claim: User roles
            email: user.email         // Custom claim: User email
          };

        const token = jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: '30m' });
        res.status(200).json({data: {token: token}, message: "Login successful"});
    } catch (error) {
        res.status(400).json({ error: 'Error logging in' });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.password = newPassword; // Will be hashed in the User model's pre-save middleware
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(400).json({ error: 'Error resetting password' });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.password = newPassword; // Will be hashed in the User model's pre-save middleware
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(400).json({ error: 'Error resetting password' });
    }
};