const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Asset = require('../models/Asset');
const { ensureAuthenticated } = require('../utils/auth');
const router = express.Router();

const storagePath = process.env.ASSET_STORAGE_PATH || './assets';
if (!fs.existsSync(storagePath)) fs.mkdirSync(storagePath, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, storagePath);
    },
    filename: function (req, file, cb) {
        // Keep it simple
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post('/upload', ensureAuthenticated, upload.single('file'), async (req, res) => {
    try {
        const { project, type } = req.body;
        const asset = new Asset({
            owner: req.user.id,
            project,
            filename: req.file.filename,
            originalname: req.file.originalname,
            type,
            url: `/assets/${req.file.filename}`,
        });
        await asset.save();
        res.json({ asset, url: asset.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/download/:assetId', ensureAuthenticated, async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.assetId);
        if (!asset) return res.status(404).json({ error: "Asset not found" });
        res.download(path.join(storagePath, asset.filename), asset.originalname);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:projectId', ensureAuthenticated, async (req, res) => {
    // List assets for project
    try {
        const assets = await Asset.find({ project: req.params.projectId });
        res.json(assets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/export', ensureAuthenticated, async (req, res) => {
    // Asset/project export STUB
    res.status(501).json({ message: "Asset export not yet implemented." });
});

module.exports = router;
