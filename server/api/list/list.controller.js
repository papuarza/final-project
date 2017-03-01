const Q = require('q');
const _ = require('lodash');
const listModel = require('./list.model');
const cardModel = require('../card/card.model');

exports.getLists = function(req, res, next) {
  	listModel.find({}, function(err, lists) {
	 	if (err) {
	 		return res.json(err);
	 	}

        Promise.all([
            listModel.populate(lists, 'cards')
        ]).then(function(_lists) {
            _.forEach(lists, (list) => {
                list.cards = _.orderBy(list.cards, ['position','title','_id']);
            });
            return res.json( lists );
        });
  	});
};

exports.createList = function(req, res, next) {
	var item = new listModel({
	    title: req.body.title,
        position: req.body.position
	});

	Q.nfcall(item.save.bind(item))
        .then(function () { 
            res.json({
                _id: item._id,
                title: item.title,
                position: item.position,
                cards: []
            });
        });
};

exports.editList = function(req, res, next) {
	listModel
        .findById(req.params.id, function(err, list) {
            if (err) {
                res.status(400).json({ message: 'impossible to update the list', error: err });
            }

            if (list) {
                _.merge(list, req.body);
                list.save(function(err) {
                    if (err) {
                        res.json({ message: 'impossible to update the list', error: err });
                    };
                    res.json({ message: 'list successfully updated', list });
                });
            } else {
                res.status(404).json({ message: 'list not found' });
            }
        });
};

exports.removeList = function (req, res) {
    listModel
        .findByIdAndRemove(req.params.id, function(err) {

            if (err) {
                res.json({ message: 'error during remove list', error: err });
            }

            // Delete all cards in the list
            cardModel.remove({ list: req.params.id }, function() {
                res.json({ message: 'list successfully deleted' });
            });
        });
};