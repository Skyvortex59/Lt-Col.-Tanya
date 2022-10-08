const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: 'ping',
        description: 'Pong.'
    },
    run: async (bot, interaction, args) => {

        interaction.reply({
            content: "Pong !",
            ephemeral: true,
        })

}}