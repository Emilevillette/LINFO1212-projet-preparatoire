function page_render_options(req) {
    if (req.session.username) {
        return {
            loggedIn: true,
            username: req.session.username,
        }
    }
    return {
        loggedIn: false,
        username: "Anonyme",
    }
}


class PageOptions {
    constructor() {
        this.attributes = {};
    }

    add_message(messageCode, success, display = true) {
        this.attributes["message"] = {
            message: message,
            success: success === true ? "#198754" : "#dc3545",
            display: display ? "inline-block" : "none",
        }
    }

    get_message(messageCode) {
        return status_message[messageCode];
    }

    add_username(req) {
        if (req.session.username) {
            this.attributes["username"] = req.session.username
        }
    }

    get_attribute(name) {
        if (name in this.attributes) {
            return this.attributes[name];
        }
        return null;
    }

    get get_attributes() {
        return this.attributes;
    }
}

status_message = {
    create_ok: "Compte créé avec succès.",
    create_fail: "Cet email est déjà utilisé.",
    connect_ok: "Connecté avec succès.",
    connect_not_found: "Ce compte n'existe pas.",
    connect_password_incorrect: "Mot de passe incorrect, merci de réessayer.",
    login_required_incident_submit: "Vous devez être connecté(e) pour signaler un incident.",
}

module.exports = {page_render_options, PageOptions}