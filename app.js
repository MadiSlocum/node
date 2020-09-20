var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require("cors")
//var bodyParser = require("body-parser")

var indexRouter = require('./routes/index.js');
var coursesRouter = require('./routes/courses.js');
//var departmentRouter = require('./routes/department.js');

process.env.PORT = 8080;
var app = express();

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
    host: "localhost",
    user: "root",
    password: "Madi123!",
    database: "courses"
  });
  res.locals.connection.connect();
  next();
});
/*const dbConfig = require("./db.config.js");
const { ppid } = require('process');

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;*/

app.use("/courseapi/", indexRouter);
app.use("/courseapi/courses", coursesRouter);
//app.use("/courseapi/courses/department", departmentRouter);

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
