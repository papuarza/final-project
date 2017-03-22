var LocalStrategy  = require('passport-local').Strategy;
var User           = require('../auth/user/user.model');
var Gym           = require('../auth/gyms/gym.model');
const bcrypt       = require("bcrypt");

module.exports = function (passport) {

passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ "_id": id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  passport.use(new LocalStrategy(
  (username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user);
    });
  }));
}
