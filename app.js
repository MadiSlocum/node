var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require("cors")
var app = express();
process.env.PORT = 8080;

var indexRouter = require('./routes/index.js');
var coursesRouter = require('./routes/courses.js');
var departmentRouter = require('./routes/department.js');


const cor = cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true
});
app.use(cor);
app.options("*", cor);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const mysql = require("mysql");
app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection({
    host: "t3-database.cwre8cvv6tyn.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "passwordt3",
    database: "courses"
  });
  res.locals.connection.connect();
  next();
});

app.use("/courseapi/", indexRouter);
app.use("/courseapi/courses", coursesRouter);
app.use("/courseapi/dept", departmentRouter);

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
