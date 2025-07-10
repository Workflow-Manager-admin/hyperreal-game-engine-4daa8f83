const express = require('express');
const Setting = require('../models/Setting');
const { ensureAuthenticated } = require('../utils/auth');
const router = express.Router();

/**
 * @route GET /api/settings/:project
 * @desc Get project settings
 */
router.get('/:project', ensureAuthenticated, async (req, res) => {
    const setting = await Setting.findOne({ project: req.params.project });
    res.json(setting);
});

/**
 * @route PATCH /api/settings/:project
 * @desc Update project settings
 */
router.patch('/:project', ensureAuthenticated, async (req, res) => {
    let setting = await Setting.findOne({ project: req.params.project });
    if (!setting) {
        setting = new Setting({ project: req.params.project });
    }
    Object.assign(setting, req.body);
    await setting.save();
    res.json(setting);
});

module.exports = router;
