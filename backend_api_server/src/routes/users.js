const express = require('express');
const User = require('../models/User');
const { ensureAuthenticated } = require('../utils/auth');
const router = express.Router();

/**
 * @route GET /api/users/me
 * @desc Get authenticated user's profile
 */
router.get('/me', ensureAuthenticated, async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate('projects')
        .populate('assets');
    res.json(user);
});

/**
 * @route PATCH /api/users/me
 * @desc Update user profile
 */
router.patch('/me', ensureAuthenticated, async (req, res) => {
    const user = await User.findById(req.user.id);
    Object.assign(user, req.body);
    await user.save();
    res.json(user);
});

/**
 * @route GET /api/users
 * @desc List all users (admin only, stub for permission)
 */
router.get('/', ensureAuthenticated, async (req, res) => {
    // Permission check stub: allow all for now
    const users = await User.find();
    res.json(users);
});

module.exports = router;
