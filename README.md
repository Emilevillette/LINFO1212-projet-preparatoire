# LINFO1212-projet-préparatoire

## Group A12

05/11/2022

Emile VILLETTE, Téo POUCET, Arthur LOUETTE

### How to run the project
To run the project (without node for now), run: `npx http-server` and navigate to `src`

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
    |-- incident_input.html
    |-- index.html
    |-- js
    |   `-- insert_code.js
    |-- login.html
    `-- navbar.html

4 directories, 12 files
```
