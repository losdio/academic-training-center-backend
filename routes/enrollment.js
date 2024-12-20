const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authenticate');
const { enroll } = require('../controllers/enrollment.controller');

/**
 * @swagger
 * /enrollment:
 *   post:
 *     summary: Enroll in a course
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course to enroll in
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Enrolled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Enrolled successfully"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

router.post('/', authenticate, enroll);

module.exports = router;
