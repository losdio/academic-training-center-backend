const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    id: { type: Number },
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

assignmentSchema.pre('save', async function(next) {
    if (this.isNew) {
        const lastAssignment = await mongoose.model('Assignment').findOne().sort({ id: -1 });
        this.id = lastAssignment ? lastAssignment.id + 1 : 1;
    }
    next();
});

module.exports = mongoose.model('Assignment', assignmentSchema);
