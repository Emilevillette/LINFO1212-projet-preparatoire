const express = require('express');
const session = require('express-session');

const bodyparser = require('body-parser');
const urlencodedParser = bodyparser.urlencoded({extended: true});
const path = require('path');

const https = require('https');
const fs = require('fs');

const app = express();

const {sequelize: db} = require("./config/database");
const IncidentModel = require("./models/incidents");
const UserModel = require("./models/users");
const accountManager = require("./scripts/account_management");
const incidentManager = require("./scripts/incident_management");

const {page_render_options, PageOptions, MessageClass} = require("./scripts/page_render")


const public_dir = path.join(__dirname, 'public');

app.set('view engine', 'ejs');

//Initialize database
const initDB = async () => {
    console.log("Starting database:");
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize model
        // Users can have relations with multiple incidents
        UserModel.hasMany(IncidentModel, {as: "incidents", foreignKey: {name: "email", allowNull: false}});
        IncidentModel.belongsTo(UserModel, {as: "user", foreignKey: {name: "email", allowNull: false}})

        await db.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initDB().then(() => {
    console.log("Database successfully initiated");
});

//Setup express-session
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

//index dir
app.get('/', function (req, res) {
    res.render('pages/index.ejs', page_render_options(req));
});

//Retrieves incidents by search/date
app.get('/get_incidents', function (req, res) {
    incidentManager.retrieve_incidents(req.query.date, req.query.search).then(jsonres => {
        //Reply with the incidents found (or empty otherwise)
        res.json(jsonres);
    })
})


//Login page
app.get('/login', function (req, res) {
    res.render('pages/login.ejs', page_render_options(req));
});


/**
 * Attempts to log in user with provided information
 *
 * pre: user login info provided in form
 * post: user is logged in if the provided info is correct
 */
app.post('/login_account', urlencodedParser, function (req, res) {
    accountManager.get_account(req.body.existing_email, req.body.existing_password).then(result => {
        //Render options (message banner)
        req.session.message = new MessageClass(result["code"]);
        if (result["pass"] === false) {
            //Incorrect login infos
            res.redirect("/login");
        } else {
            //correct login infos
            req.session.username = result["data"].username;
            req.session.email = result["data"].email;

            res.redirect("/login");
        }
    });

});


/**
 * Attempts to create account
 *
 * pre: new account info given in form
 * post: account is created if not already present in database
 */
app.post('/create_account', urlencodedParser, function (req, res) {
    accountManager.create_account(req.body.new_email, req.body.new_password, req.body.new_username, req.body.new_fullname)
        .then(code => {
            req.session.message = new MessageClass(code);
            res.redirect("login");
        });
});

app.get('/incident_input', function (req, res) {
    if (!req.session.username) {
        req.session.message = new MessageClass("login_required_incident_submit")
        res.redirect("/login");
    } else {
        res.render('pages/incident_input.ejs', page_render_options(req));
    }
});

/**
 * Creates a new incident in the database if the user is logged in
 *
 * pre: incident info given in form
 * post: incident is created in database if user is logged in
 */
app.post('/report_incident', urlencodedParser, function (req, res) {
    //This condition is to prevent users from resubmitting a form after logging out
    if (!req.session.username) {
        req.session.message = new MessageClass("login_required_incident_submit")
        res.redirect("/login");
    } else {
        incidentManager.create_incident(req.body.description, req.body.address, req.session.email);
        req.session.message = new MessageClass("incident_create_ok")
        res.redirect("/");
    }
});


/**
 * Logs out the user and redirects to index
 *
 * pre:
 * post: user is logged out (session is destroyed)
 */
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

//Serve public directory
app.use(express.static(public_dir));

//404 handler
app.get('*', function (req, res) {
    res.status(404).send("La page n'existe pas");
});


app.use(express.static('content'));
//Create HTTPS server
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'ingi'
}, app).listen(8080, () => {
    console.log("Server up at http://localhost:8080/")
});