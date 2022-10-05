function loadContent(divID, file) {
    fetch(file)
        .then(response => response.text())
        .then(text => document.getElementById(divID).innerHTML = text);
}

// Inspired by: https://www.delftstack.com/howto/javascript/load-html-file-javascript/