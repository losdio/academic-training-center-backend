const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

announcementSchema.pre('save', async function(next) {
    if (this.isNew) {
        const lastAnnouncement = await mongoose.model('Announcements').findOne().sort({ id: -1 });
        this.id = lastAnnouncement ? lastAnnouncement.id + 1 : 1;
    }
    next();
});

module.exports = mongoose.model('Announcements', announcementSchema);
