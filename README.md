# LINFO1212-projet-préparatoire

## Group A12

Emile VILLETTE, Téo POUCET (Present until ~ week 5 for medical reasons), Arthur LOUETTE

## How to run the project

### Requirements

`nodejs`, `npm` and `openssl` are required to run this project.

### Actually running the project

To install the required packages: `npm install`

Generate HTTPS files: `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365`

To run the project run: `node app.js` and head to `https://localhost:8080/` on your preferred browser

**TO TEST THE PROJECT :** the database is not committed on the Git repository (because it is a bad practice). 

To help you test the database, we've written a small Javascript file to populate it. Run `node populate_database.js`.

### Notes

**We had to squash last minute bugs because of browser cross-compatibility. Please note that this project has been tested on Chromium and Firefox only.**

We used `Bootstrap` for the styling.

The backend runs with `nodejs`/`expressjs`. The database is the `Sequelize` ORM (with `sqlite3`). Password are hashed with the `bcrypt` library.

Templating is done with `ejs`.

### Project structure

The `./specifications` directory contains the specifications in the Gherkin format.

`./config` and `./models` contains the configuration of the database and the Sequelize models, respectively.

`./views` contains the HTML templates served to the clients (`/partials` for recurring elements such as navbars and `/pages` for the specific pages).

`./public` contains the elements accessible by the user.

`./scripts` are the backend functions (user-related and incident-related ones in the scope of this project).

```bash
.
|-- app.js
|-- cert.pem
|-- config
|   `-- database.js
|-- key.pem
|-- models
|   |-- incidents.js
|   `-- users.js
|-- package.json
|-- package-lock.json
|-- populate_database.js
|-- preparatoryproject.sqlite
|-- public
|   |-- css
|   |   `-- body.css
|   |-- favicon.ico
|   |-- img
|   |   `-- logo.png
|   `-- js
|       |-- connection_popup.js
|       `-- retrieve_incidents.js
|-- README.md
|-- scripts
|   |-- account_management.js
|   |-- incident_management.js
|   `-- page_render.js 
|-- specifications
|   |-- incidentinput.feature
|   |-- LINFO1212-Preparatoire.drawio.xml
|   |-- login.feature
|   `-- search.feature
`-- views
    |-- pages
    |   |-- incident_input.ejs
    |   |-- index.ejs
    |   `-- login.ejs
    `-- partials
        |-- footer.ejs
        |-- head.ejs
        `-- navbar.ejs

11 directories, 29 files
```
