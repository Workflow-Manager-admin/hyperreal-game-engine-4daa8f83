/**
 * Middleware to ensure JWT authentication.
 */
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function ensureAuthenticated(req, res, next) {
    let token = req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) token = token.slice(7);
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id);
        if (!user) throw new Error('No user found');
        req.user = { id: user._id, email: user.email, username: user.username };
        next();
    } catch (e) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = { ensureAuthenticated };
