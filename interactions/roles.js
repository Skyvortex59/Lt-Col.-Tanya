const { 
    MessageActionRow, 
    MessageSelectMenu, 
    MessageButton, 
    EmbedBuilder, 
    // ButtonStyle,
    Channel, 
    ButtonInteraction, 
    SelectMenuInteraction, 
    ApplicationCommandOptionType } = require('discord.js');
const { prefix } = require("../Storage/config.json");
const db = require("../Storage/roleDB.json")

module.exports = {
    config: {
        name: 'roles',
        description: 'Roles Assigners.',
        options: [{
            name: 'options',
            type: ApplicationCommandOptionType.String,
            description: "Donne l'embed pour initialiser le role assigner",
            required: false
        }],
    },
    run: async (bot, interaction, args) => {
        
        const servID = interaction.guildId;

        if(args == 'embed') {
            const buttonRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('assign')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
            )
            
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Assign Roles')
                .setDescription('If you want to assign a role, click the button "Assign"');
            
            const dropdownRow = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId('general')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Series',
                        description : 'Serie role  category',
                        value : 'category-series'
                    },
                    {
                        label: 'Hobbies',
                        description : 'Hobby role category',
                        value : 'category-hobbies'
                    }
                ])
                .setMaxValues(1)
            )

            const filterButton = (int) => {
                return interaction.user.id === int.user.id && interaction.customId == 'assign'
            }

            const collectorButton = interaction.channel.createMessageComponentCollector({
                filterButton
            });
            

            await collectorButton.on('collect', async (i) => { // = ButtonInteraction
                
                if(i.componentType == ComponentType.Button) {
                    console.log(`Button :\t`, i.message.content);
                    return await i.reply({
                        content: "Choose the category of the role you want",
                        ephemeral: true,
                        components: [dropdownRow]
                    });
                }
                

                if(i.isSelectMenu() && i.customId == 'general') {
                    for( let elmt of db[servID].roles) {
                        if(i.values[0] == `category-${elmt.category}`) {
                            console.log(`selectMenu :\t`, i.message.content);
                            await i.channel.send({
                                content: "Pick your role",
                                ephemeral: true,
                                components: [dropdownSerie]
                            })
                        }
                    }
                    
                }
                
            })
            
            // await console.log(collectorButton.total);
        
            const dropdownSerie = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId('category-serie')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Terror Man',
                        description : 'La série Terror Man',
                        value : 'serie-terrorMan'
                    },
                    {
                        label: 'Counter Cube',
                        description : 'Hobby role category',
                        value : 'serie-counterCube'
                    }
                ])
                .setMaxValues(1)
            )
            const dropdownHobby = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId('category-hobby')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Terror Man',
                        description : 'La série Terror Man',
                        value : 'serie-terrorMan'
                    },
                    {
                        label: 'Counter Cube',
                        description : 'Hobby role category',
                        value : 'serie-counterCube'
                    }
                ])
                .setMaxValues(1)
            )
            
            // function collectDropdown(dropdownElmt) {
            //     const filter = (slctMnu = SelectMenuInteraction) => {
            //         return interaction.user.id === slctMnu.user.id
            //     }
                
            //     const collectorDropdown = interaction.channel.createMessageComponentCollector({
            //         filter
            //     });
                
            //     collectorDropdown.on('collect', (i = SelectMenuInteraction) => {
            //         i.reply({
            //             ephemeral: true,
            //             components: [dropdownElmt]
            //         });
            //     })
            // }
            
            
            

            await interaction.reply({ content: 'Want you pick an role ^^ ?', ephemeral: false, embeds: [embed], components: [buttonRow] });

            // await collectDropdown(dropdownSerie)
            
        }
        
}}