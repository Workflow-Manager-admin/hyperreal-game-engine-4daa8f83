const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    filename: String,
    originalname: String,
    type: String, // e.g. 'model', 'texture', 'plugin', etc.
    url: String,
    createdAt: { type: Date, default: Date.now },
    metadata: {}
});

module.exports = mongoose.model('Asset', AssetSchema);
