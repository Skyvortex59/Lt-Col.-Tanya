const Discord = require("discord.js");
const { prefix } = require("../../Storage/config.json");

exports.run = async(bot, message, args) => {

    let userMentionned = message.mentions.users.first();

    console.log(userMentionned);

    if (userMentionned) {
        const MentionnedEmbed = new Discord.EmbedBuilder() //Crée un embed
            .setColor('#FF0000')
            .setAuthor({ name: `${userMentionned.username}`, iconURL: userMentionned.displayAvatarURL() })
            .setImage(userMentionned.displayAvatarURL({ format: 'png', size: 4096 }))
            .setTitle(`Voici l'avatar de [${message.guild.members.cache.get(userMentionned.id).nickname}]`)
            .setTimestamp()
        return message.channel.send({
            embeds: [MentionnedEmbed]
        }); //envoie l'embed
    }


    const embed = new Discord.EmbedBuilder() //Crée un embed
        .setColor('#FF0000')
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setImage(message.author.displayAvatarURL({format : 'png', size: 4096, dynamic : true}))
        .setTitle(`Voici votre avatar`)
        .setTimestamp()
    message.channel.send({
        embeds: [embed]
    }); //envoie l'embed

};

exports.help = {
    name: "avatar",
    aliases: ['pp'],
    description: `Cette commande sert afficher son avatar : ${prefix}avatar\nOu l'avatar de quelqu'un d'autres : ${prefix}avatar @[someone].`
};

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
};