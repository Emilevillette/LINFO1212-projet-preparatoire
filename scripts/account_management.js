const bcrypt = require("bcrypt");

class UserAlreadyExistsError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "UserAlreadyExistsError"; // (2)
    }
}

async function create_account(UserModel, email, password, username, full_name) {
    try {
        if (await check_existing(UserModel, email) !== false) {
            throw new UserAlreadyExistsError("Account already exists");
        }
    } catch (e) {
        if (e instanceof UserAlreadyExistsError) {
            return "create_fail";
        } else {
            console.log(e);
        }
    }

    UserModel.create({
        email: email,
        password_hash: await hash_password(password),
        username: username,
        full_name: full_name,
    });
    return "create_ok";
}

async function check_existing(UserModel, email) {
    const account = await UserModel.findOne({
        where: {
            email: email
        }
    });
    if (account) {
        return account;
    } else {
        return false;
    }
}

async function get_account(UserModel, email, password) {
    const account = await check_existing(UserModel, email);
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
    if(req.session.username) {
        return {
            loggedIn: true,
            username: req.session.username,
        }
    }
    return{
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