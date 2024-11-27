const express = require('express');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /attendance/{courseId}:
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
router.post('/attendance/:courseId', authMiddleware, markAttendance);

/**
 * @swagger
 * /attendance/{courseId}:
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
router.get('/attendance/:courseId', authMiddleware, getAttendance);

module.exports = router;
