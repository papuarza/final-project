/*jshint esversion:6*/
const _ = require('lodash');
mongoose = require('mongoose');

const express        = require("express");
const authController = express.Router();
const passport = require("passport");

// Our user model
const User           = require("./user.model");
const RelationUserGym = require("../../relation/relation.model");
const RelationUserGymRate = require("../../relation/relationRate.model");

// Bcrypt let us encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

exports.editUser = function(req, res, next) {
	var _id = req.params.id;
	var username = req.body.username;
	var name = req.body.name;
	var lastName = req.body.lastName;
	var city = req.body.city;
	var country = req.body.country;
	var email = req.body.email;

const user = {username, name, lastName, city, country, email};

const criteria = {
   _id: _id
 };
 const update = {
   $set: {
     username,
		 name,
		 lastName,
		 city,
		 country,
     email
   }
 };

 console.log(user, criteria)

 User.updateOne(criteria, update, function(err, user) {
   if (err) return next(err);
	 res.status(200).json(req.user);
 });

};

exports.createUser = function(req, res, next) {
	var username = req.body.username;
  var password = req.body.password;
	var name = req.body.name;
	var lastName = req.body.lastName;
	var city = req.body.city;
	var country = req.body.country;
	var email = req.body.email;

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
			lastName,
			city,
			country,
			email
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
	req.logOut();
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
						setTimeout(sendIt,1000);
						function sendIt (){
							res.json({ratedGyms, usedGyms, savedGyms})
						}
					}
				});
			});


		});
	};

	exports.listedComments = function(req, res, next) {
		let listedComments = [];
			RelationUserGymRate.find({
					user: req.params.id
			}, (err, relation) => {
					if (err) {
							return next(err);
					}
					relation.forEach(function(elem, indexOf, arr) {
						elem.populate('gym', (err, comments) => {
						if (err) {return next(err);}
						if(indexOf < arr.length - 1){
							listedComments.push(comments);
						} else {
							listedComments.push(comments);
							setTimeout(sendIt,1000);
							function sendIt (){
								res.json(listedComments);
							}
						}
					});
				});
			});
	};


	exports.changeUserStatusRate = function(req, res, next) {
		console.log("Hola")
		var userId = req.body.data.userId;
		var gymId = req.body.data.gymId;
		// console.log(userId, gymId)

	// const user = {username, name, lastName, city, country, email};

	const criteria = {
		 user: userId,
		 gym: gymId
	 };
	 const update = {
		 $set: {
			 user: userId,
			 gym: gymId,
			 used : true,
			 rated: true
		 }
	 };
	 RelationUserGym.updateOne(criteria, update, function(err, user) {
		 if (err) return next(err);
		 res.status(200).json(req.user);
	 });

	};
