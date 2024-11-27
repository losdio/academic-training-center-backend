const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enrolledTrainees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    price: { type: Number, required: true },
    status: { type: String, enum: ['ongoing', 'done'], default: 'ongoing' },

    attendance: [
        {
            date: Date,
            attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
        }
    ]
});

courseSchema.pre('save', async function(next) {
    if (this.isNew) {
        const lastCourse = await mongoose.model('Course').findOne().sort({ id: -1 });
        this.id = lastCourse ?  lastCourse.id + 1 : 1;
    }
    next();
});



module.exports = mongoose.model('Course', courseSchema);
