# LINFO1212-projet-préparatoire

## Group A12

05/11/2022

Emile VILLETTE, Téo POUCET (présent jusqu'à la moitié du projet pour des raisons médicales), Arthur LOUETTE

### How to run the project
To install the required packages: `npm install`

Generate HTTPS files: `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365`

To run the project run: `node app.js` and head to `http://127.0.0.1:8080/` 

### Notes

We used Bootstrap 5.2.2 for the styling.

We have written a small *temporary* Javascript file (`src/js/insert_code.js`) to include our navigation bar on all the website's pages. By doing that, when we modify `src/navbar.html`, the changes are reflected throughout all of our pages without any further change required.

We expect that this will be replaced further on with templates.

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
