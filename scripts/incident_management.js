const IncidentModel = require("../models/incidents");
const {Op} = require("sequelize");
const dayjs = require("dayjs");

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
async function retrieve_incidents(date, search) {
    if (date && date !== "undefined") {
        let day = new Date(new Date(date).setUTCHours(0));
        let dayAfter = new Date(new Date(day).setUTCDate(new Date(day).getUTCDate() + 1))
        return query_sequelize({
            where: {
                createdAt: {
                    [Op.between]: [day, dayAfter]
                },
            },
            raw: true,
        });
    } else if (search && search !== "undefined") {
        return query_sequelize({
            where: {
                [Op.or]: [{address: search}, {description: search}]
            },
            raw: true
        })
    } else {
        let test = await query_sequelize({raw: true});
        return query_sequelize({raw: true});
    }
}

async function query_sequelize(options) {
    let incidents = await IncidentModel.findAll(options)
    for (let i = 0; i < incidents.length; i++) {
        incidents[i]["createdAt"] = dayjs(incidents[i]["createdAt"]).toDate();
    }
    return incidents;
}


module.exports = {create_incident, retrieve_incidents};