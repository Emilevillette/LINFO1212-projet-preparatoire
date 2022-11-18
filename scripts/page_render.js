/**
 * Provides ejs with the necessary templates varaibles
 *
 * @param req the user's request
 * @returns {*|{loggedIn: boolean, message: (null|*), username}|{loggedIn: boolean, message: (null|*), username: string}}
 */
function page_render_options(req) {
    if (req.session.username) {
        retval = {
            loggedIn: true,
            username: req.session.username,
            message: req.session.message
        }
        req.session.message = null;
        return retval;
    }
    retval = {
        loggedIn: false,
        username: "Anonyme",
        message: req.session.message
    }
    req.session.message = null;
    return retval;

}


//List of all possible messages
status_message = {
    create_ok: {
        message: "Compte créé avec succès.",
        success: true
    },
    create_fail: {
        message: "Cet email est déjà utilisé.",
        success: false
    },
    connect_ok: {
        message: "Connecté avec succès.",
        success: true
    },
    connect_not_found: {
        message: "Ce compte n'existe pas.",
        success: false
    },
    connect_password_incorrect: {
        message: "Mot de passe incorrect, merci de réessayer.",
        success: false
    },
    login_required_incident_submit: {
        message: "Vous devez être connecté(e) pour signaler un incident.",
        success: false
    },
    incident_create_ok: {
        message: "Incident créé avec succès.",
        success: true
    },
    logout_ok: {
        message: "successfully logged out",
        success: true
    }
}

/**
 * Utility class to store a message and useful information concerning it (later rendered in a banner)
 */
class MessageClass {
    constructor(messageCode, display = true) {
        this.message = status_message[messageCode]["message"];
        this.success = status_message[messageCode]["success"];
        this.messageCode = messageCode;
    }
}


module.exports = {page_render_options, MessageClass}