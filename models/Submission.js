const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  assignment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  submitted_at: { type: Date, default: Date.now },
  grade: { type: Number },
  feedback: { type: String }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
