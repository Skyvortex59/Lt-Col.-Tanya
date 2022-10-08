const { prefix } = require("../../Storage/config.json");

exports.run = async(bot, message, args) => {

    if (message.mentions._content.split('!')[1] == 'ping' && !message.author.bot) {
        message.channel.send(`Pong ! ${Date.now() - message.createdTimestamp}ms.`);
    } else {
        message.channel.send(`Ping ! ${Date.now() - message.createdTimestamp}ms.`);
    }


}

exports.help = {
    name: "ping",
    aliases: ['pong'],
    description: `Cette commande sert à dire pong : ${prefix}ping`
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}