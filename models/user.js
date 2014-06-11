/**
 * Created by xiaoxiao on 6/9/14.
 */

var mongoose = require("mongoose");
var mongooseAuth = require('mongoose-auth');

var everyauth = require('everyauth')
    , Promise = everyauth.Promise;

var UserSchema = new mongoose.Schema({});

UserSchema.plugin(mongooseAuth, {
    everymodule: {
        everyauth: {
            User: function () {
                return User;
            }
        }
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;