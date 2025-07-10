const express = require('express');
const Plugin = require('../models/Plugin');
const { ensureAuthenticated } = require('../utils/auth');
const router = express.Router();

/**
 * @route POST /api/plugins/generate
 * @desc Generate new plugin via AI (stub)
 */
router.post('/generate', ensureAuthenticated, async (req, res) => {
    // AI plugin generation stub - integrate real AI later
    res.status(501).json({ message: "Plugin AI generation not implemented." });
});

/**
 * @route POST /api/plugins
 * @desc Upload a plugin
 */
router.post('/', ensureAuthenticated, async (req, res) => {
    const plugin = new Plugin({
        project: req.body.project,
        author: req.user.id,
        code: req.body.code || "",
        metadata: req.body.metadata || {}
    });
    await plugin.save();
    res.status(201).json(plugin);
});

/**
 * @route GET /api/plugins/:projectId
 * @desc List plugins for a project
 */
router.get('/:projectId', ensureAuthenticated, async (req, res) => {
    const plugins = await Plugin.find({ project: req.params.projectId });
    res.json(plugins);
});

module.exports = router;
