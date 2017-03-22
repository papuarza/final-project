/*jshint esversion:6*/
const express       = require('express');
//const journalRoutes = require('./api/journal-entries');
const router        = express.Router();
const Gym = require('../auth/gyms/gym.model');
const RelationUserGymRate = require("../relation/relationRate.model");


exports.getGymList = function(req, res, next) {
	Gym.find({}, function (err, gyms) {
		if (err) return next(err)
		gyms.forEach(function(gym){
			RelationUserGymRate.find({gym: gym._id }, {rate:1, _id:0}, (err, relation) => {
	        if (err) { return next(err);}
					var x = relation.reduce(function(acc, elem){
						return acc += elem.rate;
					},0)
					if (x>0){
						gym["promrate"] = x/relation.length;
					} else {
						gym["promrate"] = x;
					}
			});
		});
		setTimeout(sendIt,1000);
		function sendIt (){
					res.json(gyms);
		}

	});
};

exports.getGymItem = function(req, res, next) {
	const id = req.params.id
	  Gym.findOne({_id : id}, function (err, gym) {
	    if (err) return next(err)
	    res.json(gym);
	  })
};
