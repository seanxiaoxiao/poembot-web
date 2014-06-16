/**
 * Created by xiaoxiao on 6/15/14.
 */

var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');

var AccountSchema = new mongoose.Schema({
    local: {
        username: String,
        email: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

AccountSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

AccountSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var Account = mongoose.model('accounts', AccountSchema);

module.exports = Account;