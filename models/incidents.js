const {Sequelize, DataTypes} = require("sequelize");

const sequelize = require("../config/database");

const Incidents = sequelize.define(
    "incidents", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        submitted_by: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        submitted_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {}
);

module.exports = Incidents;