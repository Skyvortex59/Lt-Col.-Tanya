const config = require("../../Storage/config.json");

exports.run = async(bot, message, args) => {


    if (args[0]) {
        if (!isNaN(args[0]) && args[0] >= 1 && args[0] <= 99) {

            setTimeout(() => {
                message.channel.bulkDelete(args[0]).then(message.channel.send(`${args[0]} messages(s) ont été supprimé(s)`));
            }, 1000)
        };
    };
};

exports.help = {
    name: "clear",
    aliases: ['purge'],
    description: `Cette commande sert à supprimier jusqu'à 99 messages inclus : ${config.prefix}clear [0 à 99]`
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: ['MANAGE_MESSAGES']
}