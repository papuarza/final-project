'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.post('/login', controller.logInUser);
router.post('/signup', controller.createUser);
router.post('/logout', controller.logoutUser);
router.get('/loggedin', controller.loggedInUser);
router.post('/private', controller.privateUser);
//router.put('/:id', controller.editUser);
//router.delete('/:id', controller.removeUser);

module.exports = router;
