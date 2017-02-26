var Q = require('q');
const _ = require('lodash');
mongoose = require('mongoose');
cardModel = require('./card.model');
listModel = require('../list/list.model');

exports.createCard = function(req, res, next) {
	const newCard = new cardModel({
		title: req.body.title,
		description: req.body.description,
		dueDate: req.body.dueDate,
		list: req.body.list,
        position: req.body.position
	});

	newCard.save(function(err, card) {
		if(err) {
            console.log(err);
			return res.send(500);
		}

		listModel.update(
			{ _id: card.list }, 
			{ $push: { cards: card._id } },
			function() {
				return res.send(card);
			}
		);
	});
};

exports.getCards = function(req, res, next) {
  	cardModel
	  	.find({}, function(err, cards) {
			if(err) {
				return res.json(err);
			}

			Q.all([
				cardModel.populate(cards, 'list')
			]).then(function(_cards) {
				return res.json( cards );
			});
			
		});
};

exports.editCard = function(req, res ,next) {
	const cardId = req.params.id;

	cardModel
		.findByIdAndUpdate(cardId, { $set: req.body }, function(err, card) {
			if(err) {
				return res.status(400).json({ message: 'Unable to update card', error: err });
			}

			res.json({ message: 'Card successfully updated', card: card });
		});
};

exports.removeCard = function (req, res) {
    cardModel
        .findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove card', error: err});
            };

            res.json({info: 'Card removed successfully'});
        });
};