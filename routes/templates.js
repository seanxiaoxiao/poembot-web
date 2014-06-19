/**
 * Created by xiaoxiao on 6/18/14.
 */

var Poem = require("../models/poem");
var Template = require("../models/template");

exports.all = function(req, res) {
    Template.find({name: {$ne: ""} }).sort({ name: 1 }).exec(function(err, templates) {
        if (err) return res.send(500, err);
        res.render('templates', { user : req.user, templates: templates, title: "全词牌" });
    });
};

exports.poemByTemplate = function(req, res) {
    var templateId = req.params.templateId;
    if (!templateId) return res.send(400, "Template id is required");
    Template.findOne({_id: templateId}).exec(function(err, template) {
        if (err) return res.send(500, err);
        Poem.find({template: templateId}).populate("template").populate("author").exec(function (err, poems) {
            if (err) return res.send(500, err);
            res.render('poems', { user: req.user, poems: poems, title: template.name });
        });
    });
};