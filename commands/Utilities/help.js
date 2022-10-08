const Discord = require("discord.js");
const { prefix } = require("../../Storage/config.json");

exports.run = async(bot, message, args) => {
    var help= [];

    bot.commands.forEach(element => {
        help.push(element);
    });

    const cahier = new Discord.EmbedBuilder() //Crée un embed
        .setColor('#FF0000')
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setTitle(`Aide`)
        .setFooter({ text: "Heureux de vous avoir aidé !" })
        .setTimestamp()
    for (let i = 0; i < help.length; i++) {
        if(help[i].requirements.userPerms[0] != undefined) {
            cahier.addField(`${help[i].help.name.toUpperCase()} [${help[i].help.aliases[0].toUpperCase()}]`, help[i].help.description + `\n**permissions requises : Modérateur**`);
        } else {
            cahier.addField(`${help[i].help.name.toUpperCase()} [${help[i].help.aliases[0].toUpperCase()}]`, help[i].help.description);
        }
        
    }

    console.log(message);
    
    message.channel.send({
        embeds: [cahier]
    }); //envoie l'embed


}

exports.help = {
    name: "help",
    aliases: ['aide'],
    description: `Cette commande sert lister toutes les commandes du bot : ${prefix}help`
}

exports.requirements = {
    botOwner: true,
    botPerms: [],
    userPerms: []
}