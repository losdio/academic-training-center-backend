const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied: No token provided' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length) : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.data.role){
            return res.status(403).json({ error: 'Access denied: Invalid user' });
        }
        
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;

exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'No token provided' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // decoded should have { _id, role, ... }
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };

  module.exports = authenticate;