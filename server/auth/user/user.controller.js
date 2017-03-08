/*jshint esversion:6*/
const _ = require('lodash');
mongoose = require('mongoose');

const express        = require("express");
const authController = express.Router();
const passport = require("passport");

// Our user model
const User           = require("./user.model");
const RelationUserGym = require("../../relation/relation.model");

// Bcrypt let us encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

exports.createUser = function(req, res, next) {
	var username = req.body.username;
  var password = req.body.password;
	var name = req.body.name;
	var lastName = req.body.lastName;

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
      password: hashPass,
			name,
			lastName
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

exports.logInUser = function(req, res, next) {
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


exports.logoutUser = function(req, res, next) {
	req.logout();
	res.status(200).json({ message: 'Success' });
};

exports.loggedInUser = function(req, res, next) {
if(req.isAuthenticated()) {
	return res.status(200).json(req.user);
}

return res.status(403).json({ message: 'Unauthorized' });
};

exports.logoutUser = function(req, res, next) {
	req.logout();
	res.status(200).json({ message: 'Success' });
};

exports.listedGym = function(req, res, next) {
	let ratedGyms = [];
	let usedGyms = [];
	let savedGyms = [];
    RelationUserGym.find({
        user: req.params.id
    }, (err, relation) => {
        if (err) {
            return next(err);
        }
				relation.forEach(function(elem, indexOf, arr) {
        	elem.populate('gym', (err, gyms) => {
        	if (err) {return next(err);}
					if(indexOf < arr.length - 1){
						if(gyms.rated){
							ratedGyms.push(gyms.gym);
						} else if (gyms.used){
							usedGyms.push(gyms.gym);
						} else {
							savedGyms.push(gyms.gym);
						}
					} else {
						if(gyms.rated){
							ratedGyms.push(gyms.gym);
						} else if (gyms.used){
							usedGyms.push(gyms.gym);
						} else {
							savedGyms.push(gyms.gym);
						}
						res.json({ratedGyms, usedGyms, savedGyms});
					}
				});
			});


		});
	};
