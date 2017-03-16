'use strict';

var express = require('express');
var controller = require('./gym.controller');

var router = express.Router();

router.post('/login', controller.logInGym);
router.post('/signup', controller.createGym);
router.post('/logout', controller.logoutGym);
router.post('/filter', controller.filterGyms);
router.get('/loggedin', controller.loggedInGym);
router.post('/edit/:id', controller.editGym);
router.post('/private', controller.privateGym);
router.post('/:id/listed-users', controller.listedUsers);
router.post('/:id/listed-comments', controller.listedComments);
router.post('/:id/change-user-status', controller.changeUserStatus);
//router.put('/:id', controller.editUser);
//router.delete('/:id', controller.removeUser);

module.exports = router;
