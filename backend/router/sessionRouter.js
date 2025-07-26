const express = require('express');
const Session = require('../model/sessionModel');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create new session
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { sessionName } = req.body;
    const session = await Session.create({
      userId: req.user.id,
      sessionName: sessionName || 'Untitled Session',
      chatHistory: [],
      components: [],
    });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: 'Create session failed', error: err.message });
  }
});

// List user sessions
router.get('/', authMiddleware, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'List sessions failed', error: err.message });
  }
});

// Get session by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, userId: req.user.id });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Get session failed', error: err.message });
  }
});

// Update session (chat/code/editorState)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { chatHistory, components } = req.body;
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { chatHistory, components, updatedAt: new Date() },
      { new: true }
    );
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Update session failed', error: err.message });
  }
});

// Delete session by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Delete session failed', error: err.message });
  }
});
module.exports = router;
