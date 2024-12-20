const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  session_date: { type: Date, required: true },
  session_time: { type: String, required: true },
  location: { type: String, required: true },
  available_seats: { type: Number, required: true },
  trainees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Session', SessionSchema);
