userModel = require('./user.model');

exports.getUsers = function(req, res, next) {
  	cardModel.getUsers(function(err, Users) {
	 	if(err) {
	 		console.log(err);
	 		return res.json(err);
	 	}

	 	return res.json({ users: users });
  	});
};