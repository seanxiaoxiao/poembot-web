/**
 * Created by xiaoxiao on 5/26/14.
 */

var Poem = require("../models/poem");

exports.get = function(req, res) {
    var poemId = req.params.poemId;
    if (!poemId) return res.send(400, "Poem Id is required");
    Poem.find({_id: poemId}).populate("template").exec(function(err, poem) {
        if (err) return res.send(500, err);
        res.send(200, poem);
    });
}

exports.getByAuthor = function(req, res) {
    var author = req.params.author;
    if (!author) return res.send(400, "Author name is required");
    Poem.find({author: author}).populate("template").exec(function(err, poems) {
        if (err) return res.send(500, err);
        res.render('poemByAuthor', { user : req.user, poems: poems });
    });
}
