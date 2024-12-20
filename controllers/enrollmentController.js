const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

exports.enroll = async (req, res) => {
  try {
    if (req.user.role !== 'trainee') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { course_id } = req.body;
    const course = await Course.findById(course_id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const enrollment = await Enrollment.create({ user_id: req.user._id, course_id });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
