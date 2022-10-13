var express = require('express');
var path = require('path');
var app = express();

const db = require("./config/database");
const IncidentModel = require("./models/incidents");
const UserModel = require("./models/users");

var public_dir = path.join(__dirname, 'public');

app.set('view engine', 'ejs');

const initDB = async () => {
    console.log("Starting database:");
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize model
        await IncidentModel.sync({
            alter: true,
        });

        await UserModel.sync({
            alter: true,
        });


    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initDB().then(() => {
    console.log("Database successfully initiated");
});

app.post('/login_account', function (req, res, next) {
});

app.post('/create_account', function (req, res, next) {
});

app.post('/report_incident', function(req,res,next) {

});

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

app.get('*', function (req, res) {
    res.status(404).send("La page n'existe pas");
});


app.use(express.static('content'));
app.listen(8080, () => {
    console.log("Server up at http://localhost:8080/")
});