const IncidentModel = require("../models/incidents");
const {Op} = require("sequelize");

/**
 * Creates incident in database
 *
 * @param description incident description
 * @param address incident address
 * @param email the author's email address
 * @returns {Promise<void>}
 */
async function create_incident(description, address, email) {
    await IncidentModel.create({
        description: description,
        address: address,
        email: email,
    }).then(() => {
        return "incident_create_ok";
    });
}


/**
 * Returns the incidents corresponding to the date/search if provided, returns all incidents otherwise
 *
 * @param date the date, if provided (otherwise null/undefined)
 * @param search the search query if provided (otherwise null/undefined)
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
function retrieve_incidents(date, search) {
    if (date && date !== "undefined") {
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
    } else if (search && search !== "undefined") {
        return IncidentModel.findAll({
            where: {
                [Op.or]: [{address: search}, {description: search}]
            },
            raw: true
        })
    } else {
        return IncidentModel.findAll({raw: true});
    }
}

module.exports = {create_incident, retrieve_incidents};