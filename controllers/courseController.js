const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('trainer');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching courses' });
    }
};

exports.enrollInCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        // Add logic to enroll user (simplified example)
        res.status(200).json({ message: 'Successfully enrolled' });
    } catch (error) {
        res.status(500).json({ error: 'Error enrolling in course' });
    }
};

exports.addAssignment = async (req, res) => {
    const { courseId } = req.params;
    const { title, description, dueDate } = req.body;
    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        course.assignments.push({ title, description, dueDate });
        await course.save();
        res.status(201).json({ message: 'Assignment added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding assignment' });
    }
};

exports.submitAssignment = async (req, res) => {
    const { courseId, assignmentId } = req.params;
    const { file } = req.body; // Assume the file is already uploaded

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        const assignment = course.assignments.id(assignmentId);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

        assignment.submissions.push({
            trainee: req.user.id,
            file,
            submittedAt: new Date()
        });

        await course.save();
        res.status(201).json({ message: 'Assignment submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting assignment' });
    }
};

exports.markAttendance = async (req, res) => {
    const { courseId } = req.params;
    const { date, attendees } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        course.attendance.push({ date, attendees });
        await course.save();
        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error marking attendance' });
    }
};
