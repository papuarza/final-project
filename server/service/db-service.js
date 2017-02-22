var
Q = require('q'),
cardModel = require('../api/card/card.model'),
laneModel = require('../api/list/list.model');

exports.wipeDB = function() {
	Q.all([
		cardModel.remove({}),
		listModel.remove({})
	])
	.then(function() {
		console.log('db wiped');
	});
};