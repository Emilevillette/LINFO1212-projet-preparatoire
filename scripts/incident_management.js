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
    if (date && date !== "undefined") {
        var parsedDate = new Date(date);
        let day = new Date(new Date(date).setUTCHours(0));
        let dayAfter = new Date(new Date(day).setUTCDate(new Date(day).getUTCDate() + 1))
        return IncidentModel.findAll({
            where: {
                createdAt: {
                    [Op.between]: [day, dayAfter]
                },
            },
            raw: true,
        });
    } else {
        return IncidentModel.findAll({raw: true});
    }
}

module.exports = {create_incident, retrieve_incidents};