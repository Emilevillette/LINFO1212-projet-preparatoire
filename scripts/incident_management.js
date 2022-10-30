const IncidentModel = require("../models/incidents")

async function create_incident(description, address, email) {
    await IncidentModel.create({
        description: description,
        address: address,
        email: email,
    }).then(res => {
        return "incident_create_ok";
    });
}

module.exports = {create_incident};