var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/index');

var app = express();
var mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// When Successfully Connected to database

mongoose.connect('mongodb://localhost:27017/adloid', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true });
// 192.168.29.129

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', (err, connection) => {
    console.log('Database is now connected!');
});


// On error in database connection
mongoose.connection.on('error', (error) => {
    // console.log('Error in Database connection ==> ', error);
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
