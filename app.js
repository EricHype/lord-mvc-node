var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var session      = require('express-session');

var logger = require('./logger');


//internal requires ------------------
var dbConfig  = require('./config/db-config');
var authConfig = require('./config/auth-config');

mongoose.Promise = require('bluebird');
mongoose.connect(dbConfig.mongoUri);

var app = express();
app.set("env", "development");

var theHTTPLog = morgan("dev", {
  "stream": {
    write: function(str) { 
      logger.info(str, null); 
    }
  }
});


app.use(theHTTPLog);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport/auth
app.use(session({ secret: authConfig.secret })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


require('./config/passport-config')(passport);
require('./routes/authentication')(app, passport);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

