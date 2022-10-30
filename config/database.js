const {Sequelize} = require('sequelize');
const {v4: uuidv4} = require('uuid');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "preparatoryproject.sqlite"
})

module.exports = {sequelize};