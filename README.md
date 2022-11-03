# LINFO1212-projet-préparatoire

## Group A12

Emile VILLETTE, Téo POUCET (Present until ~ week 5 for medical reasons), Arthur LOUETTE

### How to run the project
To install the required packages: `npm install`

Generate HTTPS files: `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365`

To run the project run: `node app.js` and head to `https://localhost:8080/` on your preferred browser

### Notes

We used `Bootstrap` for the styling.

The backend runs with `nodejs`/`expressjs`. The database is the `Sequelize` ORM (with `sqlite3`). Password are hashed with the `bcrypt` library.

Templating is done with `ejs`.
### Project structure

Le répertoire `specifications` contient les spécifications en format Gherkin de notre site web.

`src/incident_input.html`, `src/index.html` et `src/login.html` Sont les fichiers des pages web.

`src/navbar.html` contient le code de la barre de navigation inséré sur l'ensemble des pages.

`src/js/insert_code.js` contient le code qui permet d'insérer du code HTML dans un élément `<div>`.

`src/img` content les images que nous utilisons.

```bash
|-- favicon.ico
|-- README.md
|-- specifications
|   |-- incidentinput.feature
|   |-- login.feature
|   `-- search.feature
`-- src
    |-- img
    |   |-- logo.png
    |   `-- placeholder.png
    |-- incident_input.ejs
    |-- index.ejs
    |-- js
    |   `-- insert_code.js
    |-- login.ejs
    `-- navbar.ejs

4 directories, 12 files
```
