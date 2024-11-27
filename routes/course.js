const express = require('express');
const {
    createCourse,
    updateCourse,
    deleteCourse,
    listCourses,
    getAllCourses,
    enrollInCourse,
    getMyCourses,
    getMyCourseById,
    addAssignment,
    submitAssignment
} = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const trainerMiddleware = require('../middlewares/trainerMiddleware');
const router = express.Router();

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Course created successfully
 */
router.post('/', authMiddleware, trainerMiddleware, createCourse);

/**
 * @swagger
 * /courses/{courseId}:
 *   put:
 *     summary: Update an existing course
 *     tags: [Courses]
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
 *         description: Course updated successfully
 */
router.put('/:courseId', authMiddleware, trainerMiddleware, updateCourse);

/**
 * @swagger
 * /courses/{courseId}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
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
 *         description: Course deleted successfully
 */
router.delete('/:courseId', authMiddleware, trainerMiddleware, deleteCourse);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: List all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get('/', authMiddleware, listCourses);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 */
router.get('/', getAllCourses);

/**
 * @swagger
 * /courses/my-courses:
 *   get:
 *     summary: Get all courses for the trainee
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses for the trainee
 */
router.get('/my-courses', authMiddleware, getMyCourses);

/**
 * @swagger
 * /courses/my-courses/{courseId}:
 *   get:
 *     summary: Get a specific course by ID for the trainee
 *     tags: [Courses]
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
 *         description: Course details
 */
router.get('/my-courses/:courseId', authMiddleware, getMyCourseById);

/**
 * @swagger
 * /courses/enroll/{courseId}:
 *   post:
 *     summary: Enroll in a course
 *     tags: [Courses]
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
 *         description: Enrolled in course successfully
 */
router.post('/enroll/:courseId', authMiddleware, enrollInCourse);

module.exports = router;
