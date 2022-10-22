var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var app = express();
var urlencodedParser = bodyparser.urlencoded({extended: false});
//app.use(bodyparser.json); // FOR FUTURE USE WITH API

const db = require("./config/database");
const IncidentModel = require("./models/incidents");
const UserModel = require("./models/users");
const accountManager = require("./scripts/account_management");

var public_dir = path.join(__dirname, 'public');

app.set('view engine', 'ejs');

const initDB = async () => {
    console.log("Starting database:");
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize model
        // Users can have relations with multiple incidents
        UserModel.hasMany(IncidentModel);
        IncidentModel.belongsTo(UserModel);
        await db.sync({
            alter: true,
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initDB().then(() => {
    console.log("Database successfully initiated");
});

<<<<<<< HEAD
app.post('/login_account', function (req, res, next) {
    var existing_username = req.body.existing_username;
    var existing_password = req.body.existing_password;
    console.log("username : " + existing_username + " password : " + existing_password);
    res.sendStatus(200).send('Successfully connected !');
});

app.post('/create_account', function (req, res, next) {
    var creating_username = req.body.new_username;
    var creating_password = req.body.new_password;
    var creating_name = req.body.new_fullname;
    var creating_email = req.body.new_email;
    console.log("username : " + creating_username + " password : "+ creating_password + " real name : "+ creating_name + " email : "+ creating_email);
    res.sendStatus(200).send('Account successfully created !');
=======
app.post('/login_account', urlencodedParser, function (req, res, next) {
    const existing_username = req.body.existing_username;
    const existing_password = req.body.existing_password;
    res.sendStatus(200);
});

app.post('/create_account', urlencodedParser, function (req, res, next) {
    const creating_username = req.body.new_username;
    const creating_password = req.body.new_password;
    const creating_name = req.body.new_fullname;
    const creating_email = req.body.new_email;
    console.log("username : " + creating_username + " password : " + creating_password + " real name : " + creating_name + " email : " + creating_email);
    accountManager.create_account(UserModel, creating_email, creating_password, creating_username, creating_name).then(
        code => {
            if (code === 200) {
                console.log("Account successfully created")
                res.sendStatus(200);
            } else {
                console.log("Account already exists")
                res.sendStatus(400);
            }
        }
    );
>>>>>>> 43f842107e9e3e6dfb5a5b09610d600f08382e93
});

app.post('/report_incident', function (req, res, next) {
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