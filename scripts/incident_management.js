const IncidentModel = require("../models/incidents");
const {Op} = require("sequelize");

async function create_incident(description, address, email) {
    await IncidentModel.create({
        description: description,
        address: address,
        email: email,
    }).then(res => {
        return "incident_create_ok";
    });
}

function retrieve_incidents(date) {
    if (date) {
        return IncidentModel.findAll({
            where: {
                start_datetime: {
                    [Op.gte]: date.toDate(),
                },
                raw: true,
            }
        });
    } else {
        return IncidentModel.findAll({raw: true});
    }
}

module.exports = {create_incident, retrieve_incidents};