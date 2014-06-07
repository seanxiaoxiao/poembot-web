/**
 * Created by xiaoxiao on 5/26/14.
 */
var mongoose = require("mongoose");

module.exports.connect = function(host, fn) {
    var db, host = host || "mongodb://localhost/poembot";
    mongoose.connect(host);
    db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
        console.log("Database " + host + " connected.");
        if (fn) fn(null, db);
    });
};