const {sequelize: db} = require("./config/database");
const UserModel = require("./models/users");
const IncidentModel = require("./models/incidents");
const accountManager = require("./scripts/account_management");
const bcrypt = require("bcrypt");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 6,
        min: 3
    },
    wordsPerSentence: {
        max: 7,
        min: 4
    }
});

const initDB = async () => {
    console.log("Starting database:");
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize model
        // Users can have relations with multiple incidents
        UserModel.hasMany(IncidentModel, {as: "incidents", foreignKey: {name: "email", allowNull: false}});
        IncidentModel.belongsTo(UserModel, {as: "user", foreignKey: {name: "email", allowNull: false}})

        await db.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

function makepwd() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < (Math.random()*32)+8; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


initDB().then(() => {
    console.log("Database successfully initiated");
});

async function populate_db() {
    for (let i = 0; i < (Math.random() * 7) + 4; i++) {
        const rnd_email = lorem.generateWords(1) + "@" + lorem.generateWords(1) + ".com";
        UserModel.create({
            email: rnd_email,
            password_hash: await bcrypt.hash(makepwd(), 10),
            username: lorem.generateWords(1),
            full_name: lorem.generateWords(2),
        }).then(() => {
            for (let i = 0; i < (Math.random() * 3) + 1; i++) {
                IncidentModel.create({
                    description: lorem.generateParagraphs(1),
                    address: lorem.generateSentences(1),
                    email: rnd_email,
                });
            }
        });
    }
}

populate_db();