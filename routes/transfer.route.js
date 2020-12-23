var express = require('express');

//include controller
var controller = require('../controller/transfer.controller');
// var authMiddleware = require
var validate = require('../validate/transfer.validate');

var router = express.Router();

router.get('/create', controller.create);

router.post('/create',
    validate.postCreate,
    controller.postCreate
);

module.exports = router;