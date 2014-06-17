/**
 * Created by xiaoxiao on 6/16/14.
 */

var mongoose = require("mongoose");

var AuthorSchema = mongoose.Schema({
    name: String,
    dynasty: String
});

var Author = mongoose.model("authors", AuthorSchema);

module.exports = Author;