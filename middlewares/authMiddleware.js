const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const tokenPackage = req.body.token;
    if (!tokenPackage) {
        return res.status(401).json({ error: 'Access denied: No token provided' });
    }

    const token = tokenPackage.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.role){
            return res.status(403).json({ error: 'Access denied: Invalid user' });
        }
        
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
