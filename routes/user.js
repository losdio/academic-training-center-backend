const express = require('express');
const { getUserProfile, updateUserProfile, listUsers } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

/**
 * @swagger
 * /me:
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
router.get('/', authMiddleware, getUserProfile);

/**
 * @swagger
 * /me:
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
router.put('/', authMiddleware, updateUserProfile);

/**
 * @swagger
 * /users:
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
router.get('/', authMiddleware, adminMiddleware, listUsers);

module.exports = router;
