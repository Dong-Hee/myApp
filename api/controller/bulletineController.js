const express = require('express');
const router = express.Router();
const controller = require('../routes/bulletineRoute');

router.get('/list', controller.list);

module.exports = router;