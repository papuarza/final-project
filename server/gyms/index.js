'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/list', controller.getGymList);
router.get('/list/:id', controller.getGymItem);
// router.post('/logout', controller.logoutUser);
// router.get('/loggedin', controller.loggedInUser);
// router.post('/private', controller.privateUser);
//router.put('/:id', controller.editUser);
//router.delete('/:id', controller.removeUser);

module.exports = router;
