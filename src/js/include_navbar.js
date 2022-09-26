function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(text => document.getElementById('navbar').innerHTML = text);
}

// Inspired by: https://www.delftstack.com/howto/javascript/load-html-file-javascript/