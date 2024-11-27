const express = require('express');
const { getAllAnnouncements, getAnnouncementById, createAnnouncement, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /announcement:
 *   post:
 *     summary: Send an announcement
 *     tags: [Announcements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipientId:
 *                 type: string
 *                 description: User ID of the announcement recipient
 *               message:
 *                 type: string
 *                 description: Announcement content
 *     responses:
 *       201:
 *         description: Announcement sent successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', createAnnouncement);

/**
 * @swagger
 * /announcement:
 *   get:
 *     summary: Get all announcements
 *     tags: [Announcements]
 *     responses:
 *       200:
 *         description: List of all announcements
 *       500:
 *         description: Server error
 */
router.get('/', getAllAnnouncements);

/**
 * @swagger
 * /announcement/{id}:
 *   get:
 *     summary: Get an announcement by ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The announcement ID
 *     responses:
 *       200:
 *         description: Announcement details
 *       404:
 *         description: Announcement not found
 */
router.get('/:id', getAnnouncementById);

/**
 * @swagger
 * /announcement/{id}:
 *   put:
 *     summary: Update an announcement
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The announcement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipientId:
 *                 type: string
 *                 description: User ID of the announcement recipient
 *               message:
 *                 type: string
 *                 description: Announcement content
 *     responses:
 *       200:
 *         description: Announcement updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Announcement not found
 */
router.put('/:id', updateAnnouncement);

/**
 * @swagger
 * /announcement/{id}:
 *   delete:
 *     summary: Delete an announcement
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The announcement ID
 *     responses:
 *       200:
 *         description: Announcement deleted successfully
 *       404:
 *         description: Announcement not found
 */
router.delete('/:id', deleteAnnouncement);

module.exports = router;
