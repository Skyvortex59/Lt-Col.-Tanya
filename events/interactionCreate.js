module.exports = async (bot, interaction) => {
	// name: 'interactionCreate',
        if(!interaction.isCommand()) return;
        
        // if (interaction.isSelectMenu()) {
        //     console.log("ok");
        //     if (interaction.customId == 'general') {
        //         await interaction.reply({ content: 'Something was selected!', components: [dropdownSerie], ephemeral: true});
        //     }
        // }

        

        // let args = interaction.options.map(section => section)
        if (!bot.interactions.has(interaction.commandName)) return;

        try {
            // test = interaction.options._hoistedOptions;
            // console.log(test);
            // // if(JSON.parse(interaction.options._hoistedOptions) == []) {
            // //     console.log("test");
            // //     bot.interactions.get(interaction.commandName).run(bot, interaction); //args
            // // } else {
                switch (interaction.options._hoistedOptions.length) {
                    case 0:
                        bot.interactions.get(interaction.commandName).run(bot, interaction); //args
                        break;
                
                    default:
                        bot.interactions.get(interaction.commandName).run(bot, interaction, args = interaction.options._hoistedOptions[0].value ); //args
                        break;
                }
                
            // }
            var user = bot.users.cache.filter(f => f.bot != true).forEach(elmt => {
                bot.logger.log(`[${elmt.username}#${elmt.discriminator}] a utilisé la slash commande [${interaction.commandName}]`).catch(e => { return console.log(e) });
            })
            
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error trying to execute that command!' });
        }

};