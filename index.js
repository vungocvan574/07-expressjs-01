//req.query
var express = require('express');

var port = 3000;

var userRoutes = require('./routes/user.route');

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('./public'))

app.get('/', function(req, res) {
    res.render('index', {
        name: "VNV"
    });
});


//Doan lenh cut
app.use('/users', userRoutes);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});