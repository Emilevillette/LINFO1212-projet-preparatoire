var express = require('express');
var session = require('express-session');

var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: true});
var path = require('path');

var https = require('https');
var fs = require('fs');

var app = express();

//app.use(bodyparser.json); // FOR FUTURE USE WITH API

//import {sequelize as db} from "./config/database";

const {sequelize: db, create_incident} = require("./config/database");
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
    accountManager.get_account(UserModel, req.body.existing_email, req.body.existing_password).then(result => {
        if (result["pass"] === false) {
            res.redirect("/login?code=" + result["code"]);
        } else {
            req.session.username = result["data"].username;
            req.session.email = result["data"].email;
            res.redirect("/login?code=connect_ok");
        }
    });

});

app.post('/create_account', urlencodedParser, function (req, res, next) {
    accountManager.create_account(UserModel, req.body.new_email, req.body.new_password, req.body.new_username, req.body.new_fullname)
        .then(code => {
                res.redirect("/login?code=" + code);
            }
        );
});

app.post('/report_incident', function (req, res, next) {
    if (!req.session.username) {
        res.redirect("/login?code=login_required_incident_submit");
    } else {
        create_incident(req.body.description, req.body.address, req.session.email, db, UserModel, IncidentModel);
    }
});

app.get('/', function (req, res) {
    res.render('pages/index.ejs', accountManager.page_render_options(req));
});

app.get('/login', function (req, res) {
    res.render('pages/login.ejs', accountManager.page_render_options(req));
});

app.get('/incident_input', function (req, res) {
    if (!req.session.username) {
        res.redirect('/login?code=login_required_incident_submit');
    } else {
        res.render('pages/incident_input.ejs', accountManager.page_render_options(req));
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
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