const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/projects', require('./projects'));
router.use('/assets', require('./assets'));
router.use('/plugins', require('./plugins'));
router.use('/ai', require('./ai'));
router.use('/scene', require('./scene'));
router.use('/settings', require('./settings'));
router.use('/marketplace', require('./marketplace'));
router.use('/collab', require('./collab'));
router.use('/docs', require('./docs'));

module.exports = router;
