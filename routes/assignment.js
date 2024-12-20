const express = require('express');
const { addAssignment, submitAssignment } = require('../controllers/assignmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const trainerMiddleware = require('../middlewares/trainerMiddleware');
const router = express.Router();

/**
 * @swagger
 * /assignments/{courseId}:
 *   post:
 *     summary: Add an assignment to a course
 *     tags: [Assignments]
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
 *         description: Assignment added successfully
 */
router.post('/:courseId', authMiddleware, trainerMiddleware, addAssignment);

/**
 * @swagger
 * /assignments/submit/{courseId}/{assignmentId}:
 *   post:
 *     summary: Submit an assignment for a course
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment submitted successfully
 */
router.post('/submit/:courseId/:assignmentId', authMiddleware, submitAssignment);

module.exports = router;
