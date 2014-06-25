var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var session = require('express-session');

var routes = require('./routes/index');
var poems = require('./routes/poems');
var authors = require('./routes/authors');
var accounts = require('./routes/accounts');
var templates = require('./routes/templates');
var flash = require('connect-flash');

var passport = require('passport');

require('./conf/passport')(passport); // pass passport for configuration

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
app.use(session({ secret: 'iamtheironhandsofjustice' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//app.use('/', routes);
app.get('/', authors.famous);
app.get('/poem/:poemId', poems.get);
app.post('/poem/:poemId/postComment', poems.postComment);
app.get('/template/all', templates.all);
app.get('/template/:templateId', templates.poemByTemplate);
app.get('/author/all', authors.all);
app.get('/author/famous', authors.famous);
app.get('/author/:authorId', authors.poemByAuthor);

app.post('/register', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) { return next(err); }
        if (info && info.error) {
            return res.send(409, info);
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureFlash : true // allow flash messages
}));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

db.connect("mongodb://ec2-54-215-15-1.us-west-1.compute.amazonaws.com/poembot", function() {

});
/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
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
