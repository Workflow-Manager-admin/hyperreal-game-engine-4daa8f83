const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }, // hashed
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    assets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }],
    createdAt: { type: Date, default: Date.now },
    role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);
