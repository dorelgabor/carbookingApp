var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// setup mongoose
var mongoose = require('mongoose/');   
mongoose.connect('mongodb://localhost/MyDatabase');

var Schema = mongoose.Schema;
  var UserDetail = new Schema({
        username: String,
        password: String
      }, {
        collection: 'userInfo'
      });
  var UserDetails = mongoose.model('userInfo', UserDetail);

  var ReservationDetail = new Schema({
        email: String,
        startDate: String,
        endDate: String,
        car: String,
        distance: Number,
        purpose: String
      }, {
        collection: 'reservationInfo'
      });
  var ReservationDetails = mongoose.model('reservationInfo', ReservationDetail);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);


require('./user/auth.js')(app, mongoose, UserDetails);
require('./user/pass.js')(app, mongoose, UserDetails);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
