const {  } = require('discord.js');

module.exports = {
    config: {
        name: 'ping',
        description: 'Pong.'
    },
    run: async (bot, interaction) => {

        interaction.reply({
            content: "Pong !",
            ephemeral: true,
        })

}}