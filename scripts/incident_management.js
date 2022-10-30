const IncidentModel = require("../models/incidents")

async function create_incident(description, address, email, date) {
    await IncidentModel.create({
        description: description,
        address: address,
        submitted_at: date,
        submitted_by: email,
    }).then(res => {
        return "incident_create_ok";
    });
}

module.exports = {create_incident};