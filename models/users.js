const {Sequelize, DataTypes} = require("sequelize");

const sequelize = require("../config/database");
const Incidents = require("./incidents");

const Users = sequelize.define("users", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
        primaryKey:true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    incidents: {
        type: DataTypes.UUID,
        references: {
            model: Incidents,
            key: 'id',
        },
        allowList: true,
    }

}, {});

module.exports = Users;