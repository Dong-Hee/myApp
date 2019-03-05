const express = require('express');
const router = express.Router();
const controller = require('../routes/indexRoute');

router.get('/', controller.index);

router.post('/id', function(req, res) {
    res.send('test');
});

module.exports = router;