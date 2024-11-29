const Course = require('../models/Course');

// Mark attendance
exports.markAttendance = async (req, res) => {
    const { courseId } = req.params;
    const { attendees } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        course.attendance.push({ date: new Date(), attendees });
        await course.save();

        res.status(200).json({ message: 'Attendance marked' });
    } catch (error) {
        res.status(400).json({ error: 'Error marking attendance' });
    }
};

// Get attendance report
exports.getAttendance = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate('attendance.attendees');
        if (!course) return res.status(404).json({ error: 'Course not found' });

        res.status(200).json({ attendance: course.attendance });
    } catch (error) {
        res.status(400).json({ error: 'Error fetching attendance' });
    }
};
