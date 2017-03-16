/*jshint esversion:6*/
const _ = require('lodash');
mongoose = require('mongoose');
const express        = require("express");
const authController = express.Router();
// Our user model
const RelationUserGym = require("./relation.model");
const RelationUserGymRate = require("./relationRate.model");

exports.saveNewRelationUserGym = function(req, res, next) {
	let user = req.body.data.userId;
	let gym = req.body.data.gymId;
	console.log(req.body)
	let used =false;
	let rated = false;
	var newRelation = RelationUserGym({
		user,
		gym,
		used,
		rated
	});

	newRelation.save((err) => {
		if (err) {
			res.status(400).json({ message: "Something went wrong" });
		} else {
			req.login(newRelation, function(err) {
				if (err) {
					return res.status(500).json({
						message: 'something went wrong :('
					});
				}
				res.status(200).json(req.user);
			});
		}
	});
};

exports.saveNewRelationUserGymRate = function(req, res, next) {
	let user = req.body.data.userId;
	let gym = req.body.data.gymId;
	let comment = req.body.data.formInfo.comments;
	let rate = req.body.data.formInfo.rate;

	var newRelationRate = RelationUserGymRate({
		user,
		gym,
		comment,
		rate
	});

	newRelationRate.save((err) => {
		if (err) {
			res.status(400).json({ message: "Something went wrong" });
		} else {
			req.login(newRelationRate, function(err) {
				if (err) {
					return res.status(500).json({
						message: 'something went wrong :('
					});
				}
				res.status(200).json(req.user);
			});
		}
	});
};
