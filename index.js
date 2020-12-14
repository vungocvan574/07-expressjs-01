const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(request, response) {
    response.send('<h1>Hello coders.tokyo!</h1>');
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});