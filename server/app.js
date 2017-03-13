const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const session         = require("express-session");
const passport        = require("passport");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);
mongoose.connect("mongodb://localhost/kunto-local");

const app = express();

var whitelist = [
    'http://localhost:4200',
    'http://localhost:3000',
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "passport-local-strategy",
  resave: true,
  saveUninitialized: true,
  // cookie : { httpOnly: true, maxAge: 2419200000 },
  store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.set('view engine', 'jade');

app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);
require('./config/passport')(passport);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { error:err });
});

module.exports = app;
