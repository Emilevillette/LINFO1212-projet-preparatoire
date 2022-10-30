const {DataTypes} = require("sequelize");

const sequelize = require("../config/database");
const Users = require("./users");

const Incidents = sequelize.define(
    "incidents", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            validate: {
                isUUID: 4,
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        submitted_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {}
);

module.exports = Incidents;