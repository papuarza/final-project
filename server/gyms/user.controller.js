/*jshint esversion:6*/
const express       = require('express');
//const journalRoutes = require('./api/journal-entries');
const router        = express.Router();
const Gym = require('../auth/gyms/gym.model');


exports.getGymList = function(req, res, next) {
	Gym.find({}, function (err, gyms) {
		if (err) return next(err)
		res.json(gyms);
	})
};

exports.getGymItem = function(req, res, next) {
	const id = req.params.id
	  Gym.findOne({_id : id}, function (err, gym) {
	    if (err) return next(err)
	    res.json(gym);
	  })
};
