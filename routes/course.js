const express = require('express');
const { getAllCourses, enrollInCourse } = require('../controllers/courseController'); // Ensure these are functions
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Get all courses
router.get('/', getAllCourses);

// Enroll in a course
router.post('/enroll/:courseId', authMiddleware, enrollInCourse);

const { addAssignment, submitAssignment } = require('../controllers/courseController');

module.exports = router;
