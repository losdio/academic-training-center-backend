const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    trainee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    issuedAt: { type: Date, default: Date.now },
    certificateUrl: { type: String, required: true }, // Link to the certificate file
});

module.exports = mongoose.model('Certificate', certificateSchema);
