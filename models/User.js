const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    id: { type: Number },
    phoneNumber: { type: Number },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'trainer', 'trainee'], default: 'trainee' },
    createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    const currentYear = new Date().getFullYear();
    const lastUser = await mongoose.model('User').findOne().sort({ id: -1 });
    const lastId = lastUser ? parseInt(lastUser.id.toString().slice(4)) : 0;
    this.id = parseInt(`${currentYear}${(lastId + 1).toString().padStart(4, '0')}`);
    next();
});

module.exports = mongoose.model('User', UserSchema);
