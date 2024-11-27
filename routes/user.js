const express = require('express');
const { getUserProfile, updateUserProfile, listUsers } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Get the current user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       401:
 *         description: Unauthorized
 */
router.get('/api/me', authMiddleware, getUserProfile);

/**
 * @swagger
 * /api/me:
 *   put:
 *     summary: Update the current user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put('/api/me', authMiddleware, updateUserProfile);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 *       401:
 *         description: Unauthorized
 */
router.get('/api/users', authMiddleware, adminMiddleware, listUsers);

module.exports = router;
