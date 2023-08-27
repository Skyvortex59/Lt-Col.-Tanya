const {
    ActionRowBuilder,
    SelectMenuBuilder,
    EmbedBuilder,
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
    run: async(bot, interaction, args) => {
        const tags = args.toLowerCase().replace(", ", ',').split(',')
        console.log(tags);

        try {
            const jsonData = JSON.stringify({
                code: "all",
                request: 'tags'
            });

            // Faire l'appel à l'API pour obtenir l'ASMR random avec les tags donnés
            const response = await axios.post('http://localhost/API_php/api/dlsite/', jsonData);

            // Récupérer les données de la réponse de l'API

            const asmrData = JSON.parse(response.data.response).map(item => ({
                rjcode: item.rjcode,
                tags: item.tags.map(tag => tag.toLowerCase()) // Convertir les tags en minuscules
            }));

            // Fonction pour la sélection aléatoire avec les tags spécifiques
            function tagsSelection(tags, data) {
                const selectedItems = data.filter(item =>
                    tags.every(tag =>
                        item.tags.some(itemTag => itemTag.startsWith(tag))
                    )
                );

                if (selectedItems.length > 0) {
                    const selectedIdx = Math.floor(Math.random() * selectedItems.length);
                    return selectedItems[selectedIdx].rjcode;
                } else {
                    return null;
                }
            }

            // Sélection aléatoire avec les tags spécifiques
            const selectedRjcode = tagsSelection(tags, asmrData);
            console.log(selectedRjcode);

            if (selectedRjcode) {
                const jsonDataTag = JSON.stringify({
                    code: selectedRjcode,
                    request: "all-in-one"
                });

                const responseTagSelection = await axios.post('http://localhost/API_php/api/dlsite/', jsonDataTag);
                const dataResponse = responseTagSelection.data.response;
                const cover = dataResponse.image.replace('//img.dlsite.jp', 'https://img.dlsite.jp');
                const rjTag = dataResponse.tags.map(tag => tag.replace("'", ' ')).join('\t');
                console.log(rjTag);

                // Création de l message avec les données de l'ASMR
                const embed = new EmbedBuilder()
                    .setColor('#fd6c9e')
                    .setTitle(selectedRjcode)
                    .setDescription('Voici un ASMR aléatoire :')
                    .setImage(cover)
                    .addFields([{
                        name: 'Titre',
                        value: dataResponse.name
                    }, {
                        name: 'Tags',
                        value: rjTag
                    }]);

                await interaction.reply({
                    embeds: [embed]
                });
            } else {
                console.log("Aucun élément ne correspond aux tags sélectionnés.");
                await interaction.reply("Aucun ASMR ne correspond aux tags sélectionnés.");
            }
        } catch (error) {
            console.error('Error fetching ASMR data:', error);
            await interaction.reply("Une erreur s'est produite lors de la récupération des données ASMR.");
        }
    }
}