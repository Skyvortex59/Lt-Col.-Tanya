const { 
    EmbedBuilder, 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SelectMenuBuilder,
    ApplicationCommandOptionType} = require('discord.js');
const { prefix } = require("../Storage/config.json");
const fs = require("fs");
const sftp = require('ssh2-sftp-client');
// const db = require("../Storage/roleDB.json")
const sftpOeuvre = JSON.parse(fs.readFileSync("./Storage/sftpOeuvre.json"));

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
        
        let botServID = bot.guilds.cache.get("724752395556487220").id
        console.log(botServID);

        

        if(args == 'embed') {

            const servID = interaction.guildId;

            const buttonRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('assign')
                .setLabel('Primary')
                .setStyle(ButtonStyle.Primary),
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
                    .addOptions({
                        label: "sftp_Serie_1",
                        description: "Premier lot de série sur les serveurs ftp de Piccoma.",
                        value : "sftp_serie_1"
                    })
                    .setMaxValues(1)
                )
            
            
            // await console.log(collectorButton.total);
            var tempArray = Array()
            let sftpPlateforme = Object.keys(sftpOeuvre[servID])

            console.log(sftpPlateforme);
            for (const plateforme of sftpPlateforme) {
                let sftpOeuvreId = Object.keys(sftpOeuvre[servID][plateforme])
                for (const sftpId of sftpOeuvreId) {
                    // console.log(sftpOeuvre[interaction.guildId][plateforme][sftpId]);
                    let sftpInfo = sftpOeuvre[servID][plateforme][sftpId]

                    
                    tempArray.push({
                        label: `${sftpInfo.oeuvrename}`,
                        description: `Une magnifique série de ${plateforme}`,
                        value: `${plateforme}-${sftpInfo.roleID}`
                    })
                    if (tempArray.length > 25) {
                        let valeursSupplementaires = tempArray.splice(25);
                        listeSupplementaire.push(...valeursSupplementaires);
                        if (listeSupplementaire.length > 25) {
                            let valeursSuppl = listeSupplementaire.splice(25);
                            listeSupplementaire.push(...valeursSuppl);
                        }
                    }
                                
                }   
            }

            if(tempArray.length <= 25) {
                var dropdownSFTPSerie = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                    .setCustomId('sftp')
                    .setMaxValues(tempArray.length)

                )
                // console.log(tempArray.length)
                dropdownSFTPSerie.components[0].addOptions(tempArray)
            }
            
            if(dropdownSFTPSerie.components[0].options.length > 25) {
                let index = Math.ceil(dropdownSFTPSerie.components[0].options.length / 25)
                dropdownRow.components[0].addOptions([{
                    label: `sftp_serie_${index}`,
                    description: "Blah Blah, c'est déjà trop de nombres pour moi.",
                    value : `sftp_serie_${index}`
                }])
                var dropdownSFTPSerie2 = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                    .setCustomId(`sftp_${index}`)
                    .setMaxValues(24)
                )
                dropdownSFTPSerie2.components[0].addOptions(listeSupplementaire)
            }
            // console.log(dropdownSerie.components[0]);
            

            const filterButton = (int) => {
                return interaction.user.id === int.user.id && interaction.customId == 'assign'
            }

            const collectorButton = interaction.channel.createMessageComponentCollector({
                filterButton
            });

            await collectorButton.on('collect', async (i) => { // = ButtonInteraction
                // console.log(InteractionType.MessageComponent);
                if (i.type === 3 && i.customId == "assign") {
                    console.log(`Button :\t`, i.values);
                    return await i.reply({
                        content: "Choose the category of the role you want",
                        ephemeral: true,
                        components: [dropdownRow]
                    });
                }
            })

            const filterSelectMenuGeneral = (int) => {
                return interaction.user.id === int.user.id && interaction.customId.startswith('serie-')
            }

            const collectorSelectMenuGeneral = interaction.channel.createMessageComponentCollector({
                filterSelectMenuGeneral
            });

            await collectorSelectMenuGeneral.on('collect', async(i) => {
                if (i.type === 3 && i.customId === 'general') {
                    console.log(`selectMenu :\t`, i.message.content);
                    // console.log(collectorSelectMenuGeneral);
                    await i.reply({
                        content: "Pick your role",
                        ephemeral: true,
                        components: [dropdownSFTPSerie]
                    })
                }
            })

            const filterSelectMenu = (int) => {
                return interaction.user.id === int.user.id && (interaction.customId.startswith('makma-') || interaction.customId.startswith('charon-') ||interaction.customId.startswith('babel-'))
            }

            const collectorSelectMenu = interaction.channel.createMessageComponentCollector({
                filterSelectMenu
            });

            await collectorSelectMenu.on('collect', async(i) => {
                if (i.type === 3 && i.customId === 'sftp') {
                    console.log(`selectMenu :\t`, i.message.content);
                    console.log(i);
                    switch (i.values.length) {
                        case 1:
                            var roleID = i.values[0].match(/\d+/)[0];
                            var role = i.member.guild.roles.cache.find(role => role.id === roleID);
                            let foundMin = i.member._roles.some(entry => entry == roleID)
                            switch (foundMin) {
                                case true:
                                    i.member.roles.remove(role).then(
                                        i.reply({
                                            content: `The **${role.name}** was removed to your account`,
                                            ephemeral: true
                                        })
                                    )
                                    if (interaction.customId === 'sftp') {
                                        await interaction.update({ content: 'Something was selected!', components: [] });
                                    }
                                    break;
                            
                                case false:
                                    i.member.roles.add(role).then(
                                        i.reply({
                                            content: `The **${role.name}** was added to your account`,
                                            ephemeral: true
                                        })
                                    )
                                    if (interaction.customId === 'sftp') {
                                        await interaction.update({ content: 'Something was selected!', components: [] });
                                    }
                                    break;
                            }
                            break;
                        default:
                            var roleID = i.values.map(value => value.match(/\d+/)[0]);
                            var roles = i.member.guild.roles.cache.filter(role => roleID.includes(role.id));
                            let found = i.member._roles.some(entry => roleID.includes(entry))
                            switch (found) {
                                case true:
                                    i.member.roles.remove(roles).then(
                                        i.reply({
                                            content: `The **${roles.map(r => r.name).join(", ")}** were removed to your account`,
                                            ephemeral: true
                                        })
                                    )
                                    if (interaction.customId === 'sftp') {
                                        await interaction.update({ content: 'Something was selected!', components: [] });
                                    }
                                    break;
                                case false:
                                    i.member.roles.add(roles).then(
                                        i.reply({
                                            content: `The **${roles.map(r => r.name).join(", ")}** were added to your account`,
                                            ephemeral: true
                                        })
                                    )
                                    if (interaction.customId === 'sftp') {
                                        await interaction.update({ content: 'Something was selected!', components: [] });
                                    }
                                    break;
                            }
                            break;
                    }
                }
            });
            

            
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