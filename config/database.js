const {Sequelize} = require('sequelize');
const {v4: uuidv4} = require('uuid');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "preparatoryproject.sqlite"
})

async function create_incident(description, address, email, date, db, UserModel, IncidentModel) {
    db.sync();
    IncidentModel.create(

    )
}

module.exports = {sequelize, create_incident};