/**
 * Created by xiaoxiao on 6/18/14.
 */

/**
 * Created by xiaoxiao on 5/26/14.
 */

var mongoose = require("mongoose");

var TemplateSchema = mongoose.Schema({
    name: String
});

var Template = mongoose.model("templates", TemplateSchema);

module.exports = Template;