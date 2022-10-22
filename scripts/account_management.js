const bcrypt = require("bcrypt");

class UserAlreadyExistsError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "UserAlreadyExistsError"; // (2)
    }
}

async function create_account(UserModel, email, password, username, full_name) {
    try {
        await check_existing(UserModel, email);
    } catch (e) {
        if (e instanceof UserAlreadyExistsError) {
            return 400;
        }
        else{
            console.log(e);
        }
    }

    UserModel.create({
        email: email,
        password_hash: await hash_password(password),
        username: username,
        full_name: full_name,
    });
    return 200;
}

async function check_existing(UserModel, email) {
    const emailExists = await UserModel.findOne({
        where: {
            email: email
        }
    });
    if (emailExists) {
        throw new UserAlreadyExistsError("Account already exists !");
    }
}

async function hash_password(password) {
    return bcrypt.hash(password, 10);
}


module.exports = {create_account};