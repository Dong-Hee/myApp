const express = require('express');
const router = express.Router();

const controller = require('../routes/indexRoute');

router.get('/', controller.index);

module.exports = router;