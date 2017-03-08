/*jshint esversion:6*/
const _ = require('lodash');
mongoose = require('mongoose');
const express        = require("express");
const authController = express.Router();
const passport = require("passport");

// Our user model
const Gym           = require("./gym.model");

// Bcrypt let us encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

exports.createGym = function(req, res, next) {
	var username = req.body.username;
	var name = req.body.name;
  var password = req.body.password;
	var email = req.body.email;
	var city = req.body.city;
	var country = req.body.country;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  Gym.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newGym = Gym({
      username,
      password: hashPass,
			name,
			email,
			city,
			country
    });

    newGym.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
        req.login(newGym, function(err) {
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

exports.logInGym = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }

		if (!user) { return res.status(401).json(info); }

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


exports.logoutGym = function(req, res, next) {
	req.logout();
	res.status(200).json({ message: 'Success' });
};

exports.loggedInGym = function(req, res, next) {
	if(req.isAuthenticated()) {
	return res.status(200).json(req.user);
}

return res.status(403).json({ message: 'Unauthorized' });
};

exports.logoutGym = function(req, res, next) {
	req.logout();
	res.status(200).json({ message: 'Success' });
};

exports.privateGym = function(req, res, next) {
	if(req.isAuthenticated()) {
    return res.json({ message: 'This is a private message' });
  }

  return res.status(403).json({ message: 'Unauthorized' });
};
