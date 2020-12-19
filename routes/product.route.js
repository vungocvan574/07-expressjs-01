var express = require('express');

//include controller
var controller = require('../controller/product.controller');
var validate = require('../validate/product.validate');
var authMiddleware = require('../middlewares/auth.middleware')

var router = express.Router();

router.get('/', authMiddleware.authRequire, controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.productDetail);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;