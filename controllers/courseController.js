const Course = require('../models/Course');

// Create a new course
exports.createCourse = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
      const { course_name, description, price } = req.body;
      const course = await Course.create({ course_name, description, price, trainer: req.user.id });
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Update a course
exports.updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const { name, description, price } = req.body;
    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        course.name = name || course.name;
        course.description = description || course.description;
        course.price = price || course.price;
        await course.save();

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: 'Error updating course' });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findByIdAndDelete(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting course' });
    }
};

// List all courses
exports.listCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('trainer', 'name email');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching courses' });
    }
};

const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { course_name, description, price } = req.body;
    const course = await Course.create({ course_name, description, price });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyCourses = async (req, res) => {
    try {
        // Assuming req.user.id contains the logged-in user's ID
        const courses = await Course.find({ enrolledTrainees: req.user.id }).populate('trainer', 'name email');

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching your courses' });
    }
};

exports.getMyCourseById = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findOne({
            _id: courseId,
            enrolledTrainees: req.user.id
        })
            .populate('trainer')
            .populate('assignments.submissions.trainee') // Populate submissions if needed
            .populate('attendance.attendees'); // Populate attendance if needed

        if (!course) {
            return res.status(404).json({ error: 'Course not found or you are not enrolled' });
        }

        // Check if the course is done and mark it accordingly
        const completionCriteriaMet = true; // Replace with actual criteria logic
        if (completionCriteriaMet) {
            course.status = 'done';
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching the course' });
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
        res.status(200).json({ message: 'Assignment added successfully' });
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
        res.status(200).json({ message: 'Assignment submitted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error submitting assignment' });
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
        res.status(200).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error marking attendance' });
    }
};
