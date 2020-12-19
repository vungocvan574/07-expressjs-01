var express = require('express');
var multer = require('multer');

//include controller
var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');

var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/', authMiddleware.authRequire, controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.userDetail);

router.post('/create',
    upload.single('avatar'),
    validate.postCreate,
    controller.postCreate
);

module.exports = router;