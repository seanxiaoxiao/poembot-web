var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var mongooseAuth = require('mongoose-auth');

var routes = require('./routes/index');
var users = require('./routes/users');

var poems = require('./routes/poems');


var everyauth = require('everyauth')
    , Promise = everyauth.Promise;

var UserSchema = new mongoose.Schema({});

UserSchema.plugin(mongooseAuth, {
    everymodule: {
        everyauth: {
            User: function () {
                return User;
            }
        }
    },
    password: {
        loginWith: 'email',
        everyauth: {
            getLoginPath: '/?login=1'
            , postLoginPath: '/login'
            , getRegisterPath: '/?register=1'
            , postRegisterPath: '/register'
            , registerView: 'register.jade'
            , loginSuccessRedirect: '/'
            , registerSuccessRedirect: '/'
        }
    }
});

var User = mongoose.model('User', UserSchema);

var db = require("./db");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongooseAuth.middleware());

app.use('/', routes);
app.use('/users', users);

app.get('/poem/:poemId', poems.get);
app.get('/poem/author/:author', poems.getByAuthor);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

db.connect("mongodb://localhost/poembot", function() {

});
/// error handlers

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
