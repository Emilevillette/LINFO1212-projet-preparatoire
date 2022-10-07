var express = require('express');
var path = require('path');
var app = express();

var public_dir = path.join(__dirname, 'public');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index.ejs');
});

app.get('/login', function (req, res) {
    res.render('pages/login.ejs');
});

app.get('/incident_input', function (req, res) {
    res.render('pages/incident_input.ejs');
});

app.use(express.static(public_dir));

app.use(express.static('content'));
app.listen(8080);
