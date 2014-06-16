/**
 * Created by xiaoxiao on 6/15/14.
 */

var Account = require('../models/account');
var passport = require('passport');

exports.register = function(req, res) {
    Account.register(new Account({ username: req.body.username, email: req.body.email }), req.body.password,
        function (err, account) {
            if (err) {
                return res.send(500, err);
            }
            passport.authenticate('local')(req, res, function () {
                return res.send(200);
            }
        );
    });
};


