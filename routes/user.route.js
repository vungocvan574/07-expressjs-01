const { Router } = require('express')
var express = require('express');

// var db = require('../db');
//include controller
var controller = require('../controller/user.controller')

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.userDetail);

router.post('/create', controller.postCreate);

module.exports = router;