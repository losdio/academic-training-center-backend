const express = require('express');
const { addAssignment, submitAssignment } = require('../controllers/assignmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Trainer adds an assignment
router.post('/:courseId', authMiddleware, addAssignment);

// Trainee submits an assignment
router.post('/submit/:courseId/:assignmentId', authMiddleware, submitAssignment);

module.exports = router;
