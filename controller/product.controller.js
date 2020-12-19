var db = require('../db');
// var shortId = require('shortid'); //

module.exports.index = function(req, res) {
    res.render('products/index', {
        products: db.get('products').value()
    });
};

module.exports.search = function(req, res) {
    var q = req.query.q;
    var products = db.get('products').value();
    var matchedProducts = products.filter(function(product) {
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('products/index', {
        products: matchedProducts
    });
};

module.exports.create = function(req, res) {
    res.render('products/create');
};

module.exports.productDetail = function(req, res) {
    var id = req.params.id;

    var product = db.get('products').find({ id: id }).value();

    res.render('products/view', {
        product: product
    });
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortId.generate();

    db.get('products').push(req.body).write();
    res.redirect('/products');
};