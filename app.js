var express = require('express');
var session = require('express-session');

var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: true});
var path = require('path');

var https = require('https');
var fs = require('fs');

var app = express();

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

app.use(session({
    secret: "df7p+9i+y&;qE<9G_MosjTN?$</#p3", //THIS SHOULD BE IN A CONFIG FILE AND NOT COMMITTED, used here for the sake of the project
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 86400000
    }
}));

app.post('/login_account', urlencodedParser, function (req, res, next) {
    const existing_username = req.body.existing_username;
    const existing_password = req.body.existing_password;
    res.sendStatus(200);
});

app.post('/create_account', urlencodedParser, function (req, res, next) {
    accountManager.create_account(UserModel, req.body.new_email, req.body.new_password, req.body.new_username, req.body.new_fullname)
        .then(code => {
                if (code === 200) {
                    console.log("Account successfully created")
                    res.redirect(302,"/login");
                    next();
                } else {
                    console.log("Account already exists")
                    res.redirect(302, "/login");
                    next();
                }
            }
        );
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

app.get('/contact', function (req, res) {
    res.render('pages/contact.ejs');
});

app.use(express.static(public_dir));

app.get('*', function (req, res) {
    res.status(404).send("La page n'existe pas");
});


app.use(express.static('content'));
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'ingi'
}, app).listen(8080, () => {
    console.log("Server up at http://localhost:8080/")
});