var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/pisec-conf.js');

var auth = require('http-auth');
var realm = auth.basic({
    realm: config.auth.realm
}, function (username, password, callback) { // Custom authentication method.
    callback(username === config.auth.username && password === config.auth.password);
});


var index = require('./routes/index');
var console = require('./routes/console');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use("/s/", express.static(path.join(__dirname, 'public')));
app.use("/b/", express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use("/p/", express.static(path.join(__dirname, 'node_modules/p5/lib')));

app.use('/', index);

app.use("/console", auth.connect(realm), console);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
