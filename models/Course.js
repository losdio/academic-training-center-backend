const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enrolledTrainees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    price: { type: Number, required: true }
});

assignments: [
    {
        title: String,
        description: String,
        dueDate: Date,
        submissions: [
            {
                trainee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                file: String, // File URL or path
                submittedAt: Date
            }
        ]
    }
]

attendance: [
    {
        date: Date,
        attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }
]

module.exports = mongoose.model('Course', CourseSchema);
