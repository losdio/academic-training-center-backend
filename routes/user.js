const express = require('express');
const { getUserProfile, updateUserProfile, listUsers } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.get('/me', authMiddleware, getUserProfile);
router.put('/me', authMiddleware, updateUserProfile);
router.get('/', authMiddleware, adminMiddleware, listUsers);

module.exports = router;
