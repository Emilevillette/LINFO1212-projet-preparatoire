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
        const parsedDate = new Date(date);
        return IncidentModel.findAll({
            where: {
                createdAt: {
                    [Op.between]: [parsedDate.setHours(0), parsedDate.setHours(23, 59, 59)]
                },
            },
            raw: true,
        });
    } else {
        return IncidentModel.findAll({raw: true});
    }
}

module.exports = {create_incident, retrieve_incidents};