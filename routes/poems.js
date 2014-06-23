/**
 * Created by xiaoxiao on 5/26/14.
 */


var Author = require("../models/author");
var Poem = require("../models/poem");
var Comment = require("../models/comment");
var seed = require("seed-random");

exports.get = function(req, res) {
    var poemId = req.params.poemId;
    if (!poemId) return res.send(400, "Poem Id is required");
    Poem.findOne({_id: poemId}).populate("template").populate("author").exec(function(err, poem) {
        if (err) return res.send(500, err);
        Comment.find({poem: poemId}).populate("account").exec(function(err, comments) {
            res.render('poem', { user: req.user, poem: poem, comments: comments });
        });
    });
};

exports.postComment = function(req, res) {
    var poemId = req.params.poemId;
    var content = req.body.content;
    if (!poemId) return res.send(400, "Poem Id is required");
    if (!content) return res.send(400, "Content is required");
    if (!req.user) return res.send(401, "Login Required");
    Comment.create({ content: content, account: req.user, poem: poemId }, function (err, comment) {
        if (err) return res.send(500, err);
        res.send(201);
    });
};

exports.daily = function(req, res) {
    var random = seed(Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000)))();
    Poem.find().exec(function(err, poems) {
        if (err) return res.send(500, err);
        var index = Math.floor((random * poems.length));
        Poem.findOne({_id: poems[index]._id}).populate("template").populate("author").exec(function(err, poem) {
            if (err) return res.send(500, err);
            res.render('index', { user: req.user, poem: poem });
        });
    });
};
