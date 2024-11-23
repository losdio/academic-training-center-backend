const express = require('express');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Mark attendance (Trainer only)
router.post('/:courseId', authMiddleware, markAttendance);

// Get attendance report (Admin only)
router.get('/:courseId', authMiddleware, getAttendance);

module.exports = router;
