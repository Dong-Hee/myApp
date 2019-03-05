const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportConfig = require('./passport');

require('dotenv').config();

var app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout/layout');
app.set("layout extractScripts", true);
app.use(expressLayouts);

//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser(process.env.SECRETCOOKIE));
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : process.env.SECRETCOOKIE,
  cookie : {
    httpOnly : true,
    secure : false
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

//연결
app.use('/', require('./api/controller/indexController.js'));
app.use('/auth', require('./api/controller/authController.js'));
app.use('/board', require('./api/controller/boardController.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
