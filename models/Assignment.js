const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    submissions: [
        {
            trainee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            fileUrl: { type: String, required: true },
            submittedAt: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('Assignment', assignmentSchema);
