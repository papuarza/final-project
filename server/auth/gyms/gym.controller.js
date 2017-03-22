/*jshint esversion:6*/
const _ = require('lodash');
mongoose = require('mongoose');
const express        = require("express");
const authController = express.Router();
const passport = require("passport");
const RelationUserGym = require("../../relation/relation.model");
const RelationUserGymRate = require("../../relation/relationRate.model");

// Our user model
const Gym           = require("./gym.model");

// Bcrypt let us encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const upload = require('../../config/multer');

exports.editGym = function(req, res, next) {
	var _id = req.params.id;
	var username = req.body.username;
	var name = req.body.name;
	var lastName = req.body.lastName;
	var city = req.body.city;
	var country = req.body.country;
	var email = req.body.email;
	var price = req.body.price;
	var schedule = req.body.schedule;
	var webPage = req.body.webPage;
	var facebook = req.body.facebook;
	var twitter = req.body.twitter;
	var instagram = req.body.instagram;
	var isWifi = req.body.isWifi;
	var isParking = req.body.isParking;
	var isSpa = req.body.isSpa;
	var isPool = req.body.isPool;
	var isBasketballCourt = req.body.isBasketballCourt;
	var isSoccerCourt = req.body.isSoccerCourt;
	var isTennisCourt = req.body.isTennisCourt;
	var isPaddleCourt = req.body.isPaddleCourt;
	var isTRX = req.body.isTRX;
	var isCrossfit = req.body.isCrossfit;
	var isSpinning = req.body.isSpinning;
	var isPersonalTraining = req.body.isPersonalTraining;
	var otherClasses = req.body.otherClasses;


const user = {username, name, lastName, city, country, email, price, schedule, webPage, facebook, twitter, instagram, isWifi, isSpa, isPool, isBasketballCourt, isSoccerCourt, isTennisCourt, isPaddleCourt, isTRX, isCrossfit, isSpinning, isPersonalTraining, otherClasses};

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
     email,
		 price,
		 schedule,
		 webPage,
		 facebook,
		 twitter,
		 instagram,
		 isWifi,
		 isSpa,
		 isPool,
		 isBasketballCourt,
		 isSoccerCourt,
		 isTennisCourt,
		 isPaddleCourt,
		 isTRX,
		 isCrossfit,
		 isSpinning,
		 isPersonalTraining,
		 otherClasses
   }
 };

 Gym.updateOne(criteria, update, function(err, user) {
   if (err) return next(err);
	 res.status(200).json(req.user);
 });

};

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
	passport.authenticate('local', {
		username: req.body.username, // redundant, could override
   password: req.body.password, // same here
   anotherField: true}, function(err, user, info) {
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

exports.listedUsers = function(req, res, next) {
	let usedUsers = [];
	let savedUsers = [];
    RelationUserGym.find({
        gym: req.params.id
    }, (err, relation) => {
        if (err) {
            return next(err);
        }
				console.log(relation)
				relation.forEach(function(elem, indexOf, arr) {
        	elem.populate('user', (err, users) => {
        	if (err) {return next(err);}
					if(indexOf < arr.length - 1){
						if (users.used){
							usedUsers.push(users.user);
						} else {
							savedUsers.push(users.user);
						}
					} else {
						if (users.used){
							usedUsers.push(users.user);
						} else {
							savedUsers.push(users.user);
						}
						res.json({usedUsers, savedUsers});
					}
				});
			});
		});
	};

	exports.changeUserStatus = function(req, res, next) {
		// console.log(req.body)
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
			 rated: false
	   }
	 };
	 RelationUserGym.updateOne(criteria, update, function(err, user) {
	   if (err) return next(err);
		 res.status(200).json(req.user);
	 });

	};

	exports.listedComments = function(req, res, next) {
		let listedComments = [];
	    RelationUserGymRate.find({
	        gym: req.params.id
	    }, (err, relation) => {
	        if (err) {
	            return next(err);
	        }
					// console.log(relation)
					relation.forEach(function(elem, indexOf, arr) {
	        	elem.populate('user', (err, comments) => {
	        	if (err) {return next(err);}
						if(indexOf < arr.length - 1){
							listedComments.push(comments);
						} else {
							listedComments.push(comments);
							res.json(listedComments);
						}
					});
				});
			});
	};

	exports.filterGyms = function(req, res, next) {
    filter = req.body;
    filterArr = [];
    filterArr = filter.map(function(elem){
      newObj = {};
      newObj[elem] = true;
      return newObj;
    });
    console.log(filterArr);
    if(filterArr.length > 0) {
      Gym.find({ $and: filterArr }, function(err, gyms) {
          if (err) return next(err);
          res.status(200).send(gyms);
      });
    } else {
      Gym.find({}, function(err, gyms) {
          if (err) return next(err);
          res.status(200).send(gyms);
      });
    }
	};
