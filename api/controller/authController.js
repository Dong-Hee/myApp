const express = require('express');
const router = express.Router();
const controller = require('../routes/authRoute');
const { isLoggedIn, isNotLoggedIn } = require('../routes/middlewares');

//login form
router.get('/join', controller.login);

//로그인 Proc
router.get('/loginProc', controller.loginProc);

//signform
router.get('/sign', controller.sign);

//회원가입
router.post('/signProc', controller.signProc);

module.exports = router;