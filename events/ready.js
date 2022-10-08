const { join } = require("path");
const filePath = join(__dirname, '..', 'interactions/');
const interaction = require("../functions/ready.js")

module.exports = async (bot) => {

    await interaction.loadInteraction(bot, `${filePath}`);
    
    console.log(`\n${bot.user.username} is ready !`);

} 