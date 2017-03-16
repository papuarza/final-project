'use strict';

var express = require('express');
var controller = require('./relation.controller');

var router = express.Router();

router.post('/user-gym', controller.saveNewRelationUserGym);
router.post('/user-gym-rate', controller.saveNewRelationUserGymRate);

module.exports = router;
