const trainerMiddleware = (req, res, next) => {
    if (req.user.role !== 'trainer') {
        return res.status(403).json({ error: 'Access denied: Trainers only' });
    }
    next();
};

module.exports = trainerMiddleware;
