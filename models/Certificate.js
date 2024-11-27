const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    id: { type: Number },
    trainee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    issuedAt: { type: Date, default: Date.now },
    certificateUrl: { type: String, required: true }, // Link to the certificate file
});

certificateSchema.pre('save', async function(next) {
    if (this.isNew) {
        const lastCertificate = await mongoose.model('Certificate').findOne().sort({ id: -1 });
        this.id = lastCertificate ? lastCertificate.id + 1 : 1;
    }
    next();
});

module.exports = mongoose.model('Certificate', certificateSchema);
