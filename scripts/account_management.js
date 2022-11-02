const bcrypt = require("bcrypt");
const UserModel = require("../models/users");

async function create_account(email, password, username, full_name) {
    if (await check_existing(email) !== false) {
        return "create_fail";
    }

    await UserModel.create({
        email: email,
        password_hash: await hash_password(password),
        username: username,
        full_name: full_name,
    })
    return "create_ok";
}

async function check_existing(email) {
    const account = await UserModel.findByPk(email);
    if (account) {
        return account;
    } else {
        return false;
    }
}

async function get_account(email, password) {
    const account = await check_existing(email);
    if (account === false) {
        return {
            code: "connect_not_found",
            pass: false,
            data: null
        };
    } else {
        const check = await check_password(password, account.password_hash);
        if (check) {
            return {
                code: "connect_ok",
                pass: true,
                data: account
            };
        } else {
            return {
                code: "connect_password_incorrect",
                pass: false,
                data: null
            };
        }
    }
}

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

async function check_password(providedPassword, hash) {
    return await bcrypt.compare(providedPassword, hash);
}


async function hash_password(password) {
    return bcrypt.hash(password, 10);
}


module.exports = {create_account, get_account, page_render_options};