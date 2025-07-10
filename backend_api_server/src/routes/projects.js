const express = require('express');
const Project = require('../models/Project');
const { ensureAuthenticated } = require('../utils/auth');
const router = express.Router();

/**
 * @route POST /api/projects
 * @desc Create a project
 */
router.post('/', ensureAuthenticated, async (req, res) => {
    const p = new Project({
        name: req.body.name || "Untitled Project",
        owner: req.user.id,
        collaborators: [],
        assets: [],
        plugins: [],
    });
    await p.save();
    res.status(201).json(p);
});

/**
 * @route GET /api/projects
 * @desc List all projects for user
 */
router.get('/', ensureAuthenticated, async (req, res) => {
    const projects = await Project.find({ owner: req.user.id })
        .populate('assets').populate('plugins');
    res.json(projects);
});

/**
 * @route GET /api/projects/:id
 * @desc Get a project
 */
router.get('/:id', ensureAuthenticated, async (req, res) => {
    const p = await Project.findById(req.params.id)
        .populate('assets').populate('plugins');
    res.json(p);
});

/**
 * @route PATCH /api/projects/:id
 * @desc Update a project (owner only)
 */
router.patch('/:id', ensureAuthenticated, async (req, res) => {
    const p = await Project.findById(req.params.id);
    if (p.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }
    Object.assign(p, req.body);
    await p.save();
    res.json(p);
});

/**
 * @route DELETE /api/projects/:id
 * @desc Delete a project (owner only)
 */
router.delete('/:id', ensureAuthenticated, async (req, res) => {
    const p = await Project.findById(req.params.id);
    if (p.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }
    await p.delete();
    res.status(204).end();
});

/**
 * @route POST /api/projects/:id/invite
 * @desc Invite user to collaborate (stub)
 */
router.post('/:id/invite', ensureAuthenticated, async (req, res) => {
    // STUB: Add collaborator
    res.status(501).json({ message: "Collaboration invites not implemented" });
});

module.exports = router;
