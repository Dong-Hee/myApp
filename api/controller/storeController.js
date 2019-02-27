const express = require('express');
const router = express.Router();
const controller = require('../routes/storeRoute');

router.get('/', controller.main);

module.exports = router;