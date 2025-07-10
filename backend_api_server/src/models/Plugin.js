const mongoose = require('mongoose');

const PluginSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    code: String, // source code
    metadata: {},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plugin', PluginSchema);
