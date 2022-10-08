module.exports = async (bot, interaction) => {
	// name: 'interactionCreate',
        if(!interaction.isCommand()) return;

        console.log(interaction.options._hoistedOptions);
        
        // if (interaction.isSelectMenu()) {
        //     console.log("ok");
        //     if (interaction.customId == 'general') {
        //         await interaction.reply({ content: 'Something was selected!', components: [dropdownSerie], ephemeral: true});
        //     }
        // }

        

        // let args = interaction.options.map(section => section)
        if (!bot.interactions.has(interaction.commandName)) return;

        try {
            bot.interactions.get(interaction.commandName).run(bot, interaction, args = interaction.options._hoistedOptions[0].value ); //args
            var user = bot.users.cache.filter(f => f.bot != true).forEach(elmt => {
                bot.logger.log(`[${elmt.username}#${elmt.discriminator}] a utilisé la slash commande [${interaction.commandName}]`).catch(e => { return console.log(e) });
            })
            
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error trying to execute that command!' });
        }

};