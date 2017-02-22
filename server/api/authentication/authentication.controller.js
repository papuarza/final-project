const express        = require("express");
const passport = require("passport");

// User model
const User           = require("../user/user.model");

// Bcrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

exports.signup = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
        req.login(newUser, function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'something went wrong :('
                });
            }
            res.status(200).json(req.user);
        });
      }
    });
  });
};

exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(401).json(info);
        }

        req.login(user, function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'something went wrong :('
                });
            }
            res.status(200).json(req.user);
        });
    })(req, res, next);
};

exports.logout = function(req, res) {
    req.logout();
    res.status(200).json({ message: 'Success' });
};

exports.isLoggedIn = function(req, res) {
    if(req.isAuthenticated()) {
        return res.status(200).json(req.user);
    }
    
    return res.status(403).json({ message: 'Unauthorized' });
};