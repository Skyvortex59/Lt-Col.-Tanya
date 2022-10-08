const Discord = require("discord.js");
const os = require('os');
const { prefix } = require("../../Storage/config.json");

exports.run = async(bot, message, args) => {

    const cpuData = os.cpus()
    const getMembersCounts = async(guild) => {
        await guild.fetch();
        const total = guild.approximateMemberCount;
        const online = guild.approximatePresenceCount;
        let bots = false;
        if (guild.me.permissions.has('MANAGE_WEBHOOKS')) {
            const integrations = await guild.fetchIntegrations({ includeApplications: true });
            bots = integrations.filter(i => i.application && i.application.bot).size;
        };
        return {
            total,
            online,
            bots: bots || 'N/A',
            // users: bots ? total - bots : 'N/A',
            users: total - bots,
        }
    }

    const { total, online, bots, users } = await getMembersCounts(message.guild);

    const infoEmbed = new Discord.EmbedBuilder() //Crée un embed
        .setColor('#FF0000')
        .setAuthor({ name: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL() })
        .setTitle(`Info concernant mon hébergeur :`)
        .addFields([
            {
                name: 'CPU-INFO',
                value: `\n**modèle** : ${cpuData[0].model}\n**cores :** ${cpuData.length}\n**Fréquence :** ${cpuData[0].speed}`
            }, 
            {
                name: 'Servers-Info',
                value: `Nombre de personne sur le serveur : **${users}**.
                \nDont : **${online} en ligne**.
                \nNombre de serveur : **${bot.guilds.cache.size}**.
                \nNombre de personnes totale tout serveurs confondu : **${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}**.`
            }

        ])
        .setTimestamp()

    await message.channel.send({ embeds: [infoEmbed] }); //envoie l'embed

};

exports.help = {
    name: "info",
    aliases: ['i'],
    description: `Cette commande sert à donner des infos concernant Lt-Col. Tanya : ${prefix}info`
}

exports.requirements = {
    botOwner: true,
    botPerms: [],
    userPerms: ['MANAGE_MESSAGES']
}