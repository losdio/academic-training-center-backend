const express = require('express');

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Send a notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipientId:
 *                 type: string
 *                 description: User ID of the notification recipient
 *               message:
 *                 type: string
 *                 description: Notification content
 *     responses:
 *       201:
 *         description: Notification sent successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', sendNotification);
