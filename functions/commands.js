const { join } = require("path");
const filePath = join(__dirname, "..", "commands");

const functions = require("../functions/functions.js");

module.exports.run = (bot) => {
    functions.loadCommands(bot, `${filePath}/Utilities/`);
}