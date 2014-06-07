/**
 * Created by xiaoxiao on 5/26/14.
 */

var mongoose = require("mongoose");

var PoemSchema = mongoose.Schema({
    template: String,
    title: String,
    contents: [String]
});


var Poem = mongoose.model("poems", PoemSchema);

module.exports = Poem;