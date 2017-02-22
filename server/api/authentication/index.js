'use strict';

var express = require('express');
var controller = require('./authentication.controller');

var router = express.Router();

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/loggedin', controller.isLoggedIn);

module.exports = router;