var express = require('express');
var router = express.Router();

var Author = require("../models/author");

/* GET home page. */
router.get('/', function(req, res) {
    Author.find({name: {$ne: ""} }).sort({ name: 1 }).exec(function(err, authors) {
        if (err) return res.send(500, err);
        res.render('index', { user : req.user, authors: authors });
    });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
