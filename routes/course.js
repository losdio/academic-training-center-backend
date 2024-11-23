const express = require('express');
const {
    createCourse,
    updateCourse,
    deleteCourse,
    listCourses
} = require('../controllers/courseController');
const { getAllCourses, enrollInCourse } = require('../controllers/courseController'); // Ensure these are functions
const { getMyCourses, getMyCourseById } = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, trainerMiddleware, createCourse);
router.put('/:courseId', authMiddleware, trainerMiddleware, updateCourse);
router.delete('/:courseId', authMiddleware, trainerMiddleware, deleteCourse);
router.get('/', authMiddleware, listCourses);

// Get all courses
router.get('/', getAllCourses);

// Get all courses for the trainee
router.get('/my-courses', authMiddleware, getMyCourses);

// Get a specific course by ID for the trainee
router.get('/my-courses/:courseId', authMiddleware, getMyCourseById);

// Enroll in a course
router.post('/enroll/:courseId', authMiddleware, enrollInCourse);

const { addAssignment, submitAssignment } = require('../controllers/courseController');

module.exports = router;
