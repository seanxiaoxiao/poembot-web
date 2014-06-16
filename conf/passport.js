/**
 * Created by xiaoxiao on 6/15/14.
 */

var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/account');

module.exports = function(passport) {

    passport.serializeUser(function(account, done) {
        done(null, account.id);
    });

    passport.deserializeUser(function(id, done) {
        Account.findById(id, function(err, account) {
            done(err, account);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            process.nextTick(function() {
                if (!req.user) {
                    Account.findOne({ 'local.email': email }, function (err, account) {
                        if (err) {
                            return done(err);
                        }

                        if (account) {
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        } else {
                            var newAccount = new Account();
                            newAccount.local.username = req.body.username;
                            newAccount.local.email = email;
                            newAccount.local.password = newAccount.generateHash(password); // use the generateHash function in our user model

                            newAccount.save(function (err) {
                                if (err) {
                                    throw err;
                                }
                                return done(null, newAccount);
                            });
                        }


                    });
                }
            });
        }));

    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                Account.findOne({ 'local.email': email }, function (err, account) {
                    if (err) {
                        return done(err);
                    }

                    if (!account) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    }

                    if (!account.validPassword(password)) {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }

                    return done(null, account);
                });
            });
        }));
};