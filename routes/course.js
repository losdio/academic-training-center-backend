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
 * /api/courses/{courseId}:
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
 *     responses:
 *       200:
 *         description: List of all courses
 */
router.get('/', listCourses);

/**
 * @swagger
 * /courses/all:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 */
router.get('/all', getAllCourses);

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

/**
 * @swagger
 * /courses/my:
 *   get:
 *     summary: Get my courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of my courses
 */
router.get('/my', authMiddleware, getMyCourses);

/**
 * @swagger
 * /courses/my/{courseId}:
 *   get:
 *     summary: Get my course by ID
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
router.get('/my/:courseId', authMiddleware, getMyCourseById);

module.exports = router;
