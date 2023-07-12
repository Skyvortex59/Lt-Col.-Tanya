const { 
    MessageActionRow,
    MessageSelectMenu,
    MessageEmbed,
    ApplicationCommandOptionType
} = require('discord.js');
const axios = require('axios');

module.exports = {
    config: {
        name: 'random',
        description: 'Roles Assigners.',
        options: [{
            name: 'tags',
            type: ApplicationCommandOptionType.String,
            description: "Donne un asmr random qui a le(s) tag(s) donnée(s)",
            required: false
        }],
    },
    run: async (bot, interaction, args) => {
        const tags = args.split(',')
        console.log(tags);

        try {
            // Faire l'appel à l'API pour obtenir l'ASMR random avec les tags donnés
            const response = await axios.get('http://localhost/API_php/api/dlsite/', {
                data: {
                    code: tags,
                    request: "tags"
                }
            });

            // Récupérer les données de la réponse de l'API
            const asmrData = response.data;

            // Création de l message avec les données de l'ASMR
            const embed = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle('ASMR Random')
                .setDescription('Voici un ASMR aléatoire :')
                .addField('Titre', asmrData.title)
                .addField('Tags', asmrData.tags.join(', '))
                .addField('Durée', asmrData.duration);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching ASMR data:', error);
            await interaction.reply('Une erreur s\'est produite lors de la récupération des données ASMR.');
        }
    }
}
