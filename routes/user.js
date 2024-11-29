const express = require('express');
const { getUserProfile, updateUserProfile, listUsers } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminOnlyMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get the current user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       400:
 *         description: Unauthorized
 */
router.get('/me', authMiddleware, getUserProfile);

/**
 * @swagger
 * /user/me:
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
 *       400:
 *         description: Unauthorized
 */
router.put('/me', authMiddleware, updateUserProfile);

/**
 * @swagger
 * /users/list-users:
 *   get:
 *     summary: List all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 *       400:
 *         description: Unauthorized
 */
router.get('/list-users', authMiddleware, adminOnlyMiddleware, listUsers);

module.exports = router;
