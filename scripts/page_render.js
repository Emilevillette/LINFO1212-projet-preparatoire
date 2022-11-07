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

module.exports = {page_render_options}