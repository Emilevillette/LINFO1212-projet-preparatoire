const {Sequelize, DataTypes} = require("sequelize");

const sequelize = require("../config/database");
const Incidents = require("./incidents");

const Users = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
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