/**
 * Created by xiaoxiao on 6/22/14.
 */


var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
    content: String,
    account: { type:mongoose.Schema.Types.ObjectId, ref: "accounts" },
    poem: { type: mongoose.Schema.Types.ObjectId, ref: "poems" },
    createTime: { type: Date, default: Date.now }
});

var Comment = mongoose.model("comments", CommentSchema);

module.exports = Comment;