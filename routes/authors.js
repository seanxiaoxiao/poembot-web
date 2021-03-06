/**
 * Created by xiaoxiao on 6/17/14.
 */

var Poem = require("../models/poem");
var Author = require("../models/author");
var conf = require("../conf/config.json");

exports.poemByAuthor = function(req, res) {
    var authorId = req.params.authorId;
    if (!authorId) return res.send(400, "Author id is required");
    Author.findOne({_id: authorId}).exec(function(err, author) {
        if (err) return res.send(500, err);
        Poem.find({author: authorId}).populate("template").populate("author").exec(function (err, poems) {
            if (err) return res.send(500, err);
            res.render('poems', { user: req.user, poems: poems, author: author, title: author.name });
        });
    });
};

exports.famous = function(req, res) {
    Author.find({name: {$in: conf.famousAuthors}}).sort({ name: 1 }).exec(function(err, authors) {
        if (err) return res.send(500, err);
        res.render('author', { user: req.user, authors: authors, title: "著名词人" });
    });
};

exports.all = function(req, res) {
    Author.find({name: {$ne: ""} }).sort({ name: 1 }).exec(function(err, authors) {
        if (err) return res.send(500, err);
        res.render('author', { user : req.user, authors: authors, title: "全词人" });
    });
};
