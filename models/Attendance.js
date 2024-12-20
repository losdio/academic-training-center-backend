const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['present','absent'], required: true }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
