var db = require('../db');
var shortId = require('shortId');
const { use } = require('../routes/user.route');

module.exports.create = function(req, res, next) {
    res.render('transfer/create', {
        csrfToken: req.csrfToken()
    });
    next();
};

module.exports.postCreate = function(req, res, next) {
    var data = {
        id: shortId.generate(),
        user: req.signedCookies.userId,
        accountId: req.body.accountId,
        amount: parseInt(req.body.amount)
    };

    db.get('transfer').push(data).write();
    res.render('transfer/create');
    next();
}