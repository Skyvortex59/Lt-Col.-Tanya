const log4js = require("log4js");
const moment = require("moment");

log4js.configure({
    appenders: {
        info: {
            type: "file",
            filename: "./logs.log",
            layout: {
                type: 'pattern',
                pattern: '[%d{dd/MM/yyyy - hh:mm:ss}] %p %m'
            }
        }
    },
    categories: {
        default: {
            appenders: ["info"],
            level: "trace"
        }
    }
});

exports.log = async(content) => {
    console.log(content);
    const logger = log4js.getLogger();
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`; //Si jamais tu veux également avoir la date et l'heure (Nécessite le module moment)

    logger.info(`${content.replace('[CMD] ', '[CMD] - ')}`);
};