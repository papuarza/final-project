'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/users', controller.getUsers);

module.exports = router;