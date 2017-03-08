var path = require('path');

module.exports = function(app) {
  app.use('/auth/user', require('../auth/user'));
  app.use('/auth/gym', require('../auth/gyms'));
  app.use('/gyms', require('../gyms'));
  app.use('/relation', require('../relation'));


	// catch 404 and forward to Angular
  app.all('/*', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });
};
