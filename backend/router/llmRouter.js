const express = require('express');
const { generateComponent } = require('../controller/llmController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/llm/generate
router.post('/generate', authMiddleware, generateComponent);

module.exports = router;
