const express = require('express');
const router = express.Router();

const {upload} = require('../aws/awsS3Config');
const controller = require('../routes/boardRoute');

router.get('/list', controller.list);

router.get('/detail/:id', controller.detail);

router.get('/form', controller.form);

router.post('/form/reg', upload.single('img') ,controller.create);

router.put('/update/:id', controller.update);

router.post('/tender', controller.tender);

router.delete('/delete/:id', controller.delete);

module.exports = router;