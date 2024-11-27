const express = require('express');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/attendance/{courseId}:
 *   post:
 *     summary: Mark attendance for a course
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance marked successfully
 */
router.post('/api/attendance/:courseId', authMiddleware, markAttendance);

/**
 * @swagger
 * /api/attendance/{courseId}:
 *   get:
 *     summary: Get attendance report for a course
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance report retrieved successfully
 */
router.get('/api/attendance/:courseId', authMiddleware, getAttendance);

module.exports = router;
