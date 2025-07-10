const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rendering: {},
    collab: {},
    ai_assist: {},
    preferences: {},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Setting', SettingSchema);
