/**
 * Created by xiaoxiao on 6/17/14.
 */

var Poem = require("../models/poem");
var Author = require("../models/author");

exports.poemByAuthor = function(req, res) {
    var authorId = req.params.authorId;
    if (!authorId) return res.send(400, "Author id is required");
    Author.findOne({_id: authorId}).exec(function(err, author) {
        if (err) return res.send(500, err);
        Poem.find({author: authorId}).exec(function (err, poems) {
            if (err) return res.send(500, err);
            res.render('poemByAuthor', { user: req.user, poems: poems, author: author });
        });
    });
};