const express = require('express');
const generateResponse = require('../controller/generateController');

const router = express.Router();
router.post('/generate', generateResponse);

module.exports = router;