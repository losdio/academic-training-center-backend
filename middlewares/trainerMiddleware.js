const jwt = require('jsonwebtoken');

const trainerMiddleware = (req, res, next) => {
    const tokenPackage = req.body.token;
    if (!tokenPackage) {
        return res.status(401).json({ error: 'Access denied: No token provided' });
    }

    const token = tokenPackage.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'trainer') {
            return res.status(403).json({ error: 'Access denied: Trainers only' });
        }
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = trainerMiddleware;
