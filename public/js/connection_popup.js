document.addEventListener('DOMContentLoaded', function () {
    /* your logic here */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var connection_div = document.getElementById("connection_feedback");
    if(urlParams.get('code') === "200") {
        connection_div.innerText = "Compte créé avec succès.";
        connection_div.style.backgroundColor = "#198754";
        connection_div.style.display = "block";
    } else if(urlParams.get('code')=== "400") {
        connection_div.innerText = "Cet email est déjà utilisé.";
        connection_div.style.backgroundColor = "#dc3545";
        connection_div.style.display = "block";

    }
});

