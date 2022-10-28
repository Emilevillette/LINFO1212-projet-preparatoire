document.addEventListener('DOMContentLoaded', function () {
    /* your logic here */
    const queryString = window.location.search;
    const urlParamsCode = (new URLSearchParams(queryString)).get("code");
    var connection_div = document.getElementById("connection_feedback");
    if(urlParamsCode === "create_ok") {
        connection_div.innerText = "Compte créé avec succès.";
        connection_div.style.backgroundColor = "#198754";
        connection_div.style.display = "inline-block";
    } else if(urlParamsCode === "create_fail") {
        connection_div.innerText = "Cet email est déjà utilisé.";
        connection_div.style.backgroundColor = "#dc3545";
        connection_div.style.display = "inline-block";
    } else if(urlParamsCode === "connect_ok") {
        connection_div.innerText = "Connecté avec succès.";
        connection_div.style.backgroundColor = "#198754";
        connection_div.style.display = "inline-block";
    } else if(urlParamsCode === "connect_not_found") {
        connection_div.innerText = "Ce compte n'existe pas.";
        connection_div.style.backgroundColor = "#dc3545";
        connection_div.style.display = "inline-block";
    } else if(urlParamsCode === "connect_password_incorrect") {
        connection_div.innerText = "Mot de passe incorrect, merci de réessayer.";
        connection_div.style.backgroundColor = "#dc3545";
        connection_div.style.display = "inline-block";
    }
});

