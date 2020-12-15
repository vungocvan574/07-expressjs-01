var express = require('express');
var { render } = require('pug');
var app = express();
var port = 3000;
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

var db = low(adapter);

db.defaults({ users: [] })
    .write();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var users = [
    { id: 1, name: 'Đặng Xuân Hợi' },
    { id: 2, name: 'Nguyễn Ngọc Hiệp' }
];

app.get('/', function(req, res) {
    res.render('index', {
        name: "VNV"
    });
});

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users
    });
});

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUsers
    });
});

app.get('/users/create', function(req, res) {
    res.render('users/create');
});

app.post('/users/create', function(req, res) {
    users.push(req.body);
    res.redirect('/users');
})

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});