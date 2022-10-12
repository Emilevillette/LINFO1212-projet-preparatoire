const {Sequelize, DataTypes} = require("sequelize");

const sequelize = require("../config/database");

const Users = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    submitted_by: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    submission_date: {
        type: DataTypes.DATE,
        allowNUll: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {});

module.exports = Users;