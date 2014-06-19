/**
 * Created by xiaoxiao on 5/26/14.
 */

var mongoose = require("mongoose");

var PoemSchema = mongoose.Schema({
    template: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    contents: [String]
});

var Poem = mongoose.model("poems", PoemSchema);

module.exports = Poem;