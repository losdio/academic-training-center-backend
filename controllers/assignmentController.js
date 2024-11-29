const Course = require('../models/Assignment');

// Add assignment to a course
exports.addAssignment = async (req, res) => {
    const { courseId } = req.params;
    const { title, description, dueDate } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        course.assignments.push({ title, description, dueDate });
        await course.save();

        res.status(200).json({ message: 'Assignment added', assignments: course.assignments });
    } catch (error) {
        res.status(400).json({ error: 'Error adding assignment' });
    }
};

// Submit an assignment
exports.submitAssignment = async (req, res) => {
    const { courseId, assignmentId } = req.params;
    const { file } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        const assignment = course.assignments.id(assignmentId);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

        assignment.submissions.push({ trainee: req.user.id, file, submittedAt: new Date() });
        await course.save();

        res.status(200).json({ message: 'Assignment submitted' });
    } catch (error) {
        res.status(400).json({ error: 'Error submitting assignment' });
    }
};
