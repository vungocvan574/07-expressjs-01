const { Router } = require('express')
var express = require('express');

// var db = require('../db');
//include controller
var controller = require('../controller/user.controller')
var validate = require('../validate/user.validate');

var router = express.Router();

router.get('/', controller.index);

// router.get('/cookie', function(req, res, next) {
//     res.cookie('user-id', 12345);
//     res.send('Hello');
// });

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.userDetail);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;