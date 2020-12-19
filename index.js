//req.query
require('dotenv').config();
var express = require('express');
var cookieParser = require('cookie-parser')

var port = 3000;

var userRoutes = require('./routes/user.route');
var productRoutes = require('./routes/product.route');
var authRoutes = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware')

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('process.env.SESSION_SECRET'));

app.use(express.static('./public'))

app.get('/', function(req, res) {
    res.render('index', {
        name: "VNV"
    });
});


//Doan lenh cut
app.use('/users', authMiddleware.authRequire, userRoutes);
app.use('/products', authMiddleware.authRequire, productRoutes);
app.use('/auth', authRoutes);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});