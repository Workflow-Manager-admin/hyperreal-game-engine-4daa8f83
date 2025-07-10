const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 */
router.post('/register', async (req, res) => {
    try {
        const { email, password, username } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hash = await bcrypt.hash(password, 10);
        user = new User({ email, password: hash, username });
        await user.save();
        return res.json({ message: 'Registered successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/**
 * @route POST /api/auth/login
 * @desc Login and get JWT
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/**
 * @route GET /api/auth/oauth2/google
 * @desc OAuth2 stub - real implementation to be provided
 */
router.get('/oauth2/google', (req, res) => {
    // Future: Integrate google OAuth2 logic
    res.status(501).json({ message: "OAuth2 integration stub." });
});

/**
 * @route POST /api/auth/logout
 * @desc Logout
 */
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out." });
});

module.exports = router;
