'use strict';

var express = require('express');
var controller = require('./gym.controller');

var router = express.Router();

router.post('/login', controller.logInGym);
router.post('/signup', controller.createGym);
router.post('/logout', controller.logoutGym);
router.post('/loggedin', controller.loggedInGym);
router.post('/private', controller.privateGym);
//router.put('/:id', controller.editUser);
//router.delete('/:id', controller.removeUser);

module.exports = router;
