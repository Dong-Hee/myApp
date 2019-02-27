const express = require('express');
const router = express.Router();
const controller = require('../routes/boardRoute');

router.get('/', controller.list);

router.get('/:id', controller.detail);

router.post('/reg', controller.create);

router.put('/update/:id', controller.update);

router.delete('/delete/:id', controller.delete);

module.exports = router;