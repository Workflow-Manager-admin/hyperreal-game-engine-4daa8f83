const express = require('express');
const router = express.Router();

/**
 * @route POST /api/collab/setup
 * @desc Setup/join live collab session (stub - handled by WS)
 */
router.post('/setup', (req, res) => {
    res.status(501).json({ message: "Live collaboration is in real-time through WebSocket. REST fallback not implemented." });
});

module.exports = router;
