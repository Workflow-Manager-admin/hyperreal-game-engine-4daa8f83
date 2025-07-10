const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    assets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }],
    plugins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plugin' }],
    settings: { type: mongoose.Schema.Types.ObjectId, ref: 'Setting' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
