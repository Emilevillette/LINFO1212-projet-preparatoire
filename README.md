# LINFO1212-projet-preparatoire

## Group A12

### How to run the project
To run the project (without node for now), run: `npx http-server` and navigate to `src`

### Notes

We used Bootstrap 5.2.2 for the styling.

We have written a small *temporary* Javascript file (`src/js/insert_code.js`) to include our navigation bar on all of the website's pages. By doing that, when we modify `src/navbar.html`, the changes are reflected throughout all of our pages without any further change required.

We expect that this will be replaced further on with templates.

### Project structure
(This visual representation does not include the `node_modules` directory)

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
