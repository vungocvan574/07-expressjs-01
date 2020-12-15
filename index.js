var express = require('express');
var { render } = require('pug');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var shortId = require('shortid');
var app = express();
var port = 3000;
var adapter = new FileSync('db.json');

var db = low(adapter);

db.defaults({ users: [] })
    .write();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
    res.render('index', {
        name: "VNV"
    });
});

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var users = db.get('users').value();
    var matchedUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUsers
    });
});

app.get('/users/:id', function(req, res) {
    var id = parseInt(req.params.id);

    var user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user
    });
})

app.get('/users/create', function(req, res) {
    res.render('users/create');
});

app.post('/users/create', function(req, res) {
    req.body.id = shortId.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});