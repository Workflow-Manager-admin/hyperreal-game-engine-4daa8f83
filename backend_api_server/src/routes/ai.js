const express = require('express');
const { ensureAuthenticated } = require('../utils/auth');
const router = express.Router();

/**
 * @route POST /api/ai/chat
 * @desc AI chat endpoint (stub)
 */
router.post('/chat', ensureAuthenticated, async (req, res) => {
    res.status(501).json({ message: "AI chat assistant not implemented." });
});

/**
 * @route POST /api/ai/code-assist
 * @desc AI code assistant (stub)
 */
router.post('/code-assist', ensureAuthenticated, async (req, res) => {
    res.status(501).json({ message: "AI code assistant not implemented." });
});

/**
 * @route POST /api/ai/node-eval
 * @desc AI node/code evaluation (stub)
 */
router.post('/node-eval', ensureAuthenticated, async (req, res) => {
    res.status(501).json({ message: "AI node/code evaluation not implemented." });
});

module.exports = router;
