const express = require('express');
const router = express.Router();

/**
 * @route GET /api/marketplace/plugins
 * @desc List/search plugins (stub)
 */
router.get('/plugins', (req, res) => {
    res.status(501).json({ message: "Marketplace plugins listing not yet implemented." });
});

/**
 * @route GET /api/marketplace/assets
 * @desc List/search assets (stub)
 */
router.get('/assets', (req, res) => {
    res.status(501).json({ message: "Marketplace assets listing not yet implemented." });
});

module.exports = router;
