const config = require("../Storage/config.json");



module.exports = async(bot, message) => {

    const prefix = config.prefix;
    const owners = ['323426247285669899'];
    const wompServer = ['724752395556487220']
    bot.user.setActivity("sa propre maltraitance"); // Marque en status "Joue à sa propre maltraitance"

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(prefix.length).toLowerCase();
    const cmd = bot.commands.get(command) || bot.aliases.get(command);

    const reactFunction = require('../functions/react.js');
    // await reactFunction.sortie(bot, message);
    // await reactFunction.reacting(bot, message);
    // await reactFunction.pedoCard(bot, message);
    await reactFunction.fakeGift(bot, message);
    // await reactFunction.tempo(bot, message);
    if(message.guildId === wompServer[0]) {
        await reactFunction.womp(bot, message);
    }
    

    if (!message.content.toLowerCase().startsWith(prefix) || !message.guild || message.author.bot || !cmd) return;

    if (cmd.requirements.botOwner && cmd.requirements.botOwner === true && !owners.includes(message.author.id)) return bot.functions.error(message.channel, "Désolé, seul le développeur peut utiliser cette commande.");
    if (cmd.requirements.botPerms && cmd.requirements.botPerms.length > 0 && !message.guild.me.permissions.has(cmd.requirements.botPerms)) return bot.functions.error(message.channel, `Désolé, je ne suis pas assez bien payé pour avoir la permission : \`${message.guild.me.permissions.missing(cmd.requirements.botPerms).join(", ").replace(/_/gi, " ")}\`.`);
    if (cmd.requirements.userPerms && cmd.requirements.userPerms.length > 0 && !message.member.permissions.has(cmd.requirements.userPerms)) return bot.functions.error(message.channel, `Désolé, vous n'êtes pas assez haut dans la hiérarchie pour avoir la permission : \`${message.member.permissions.missing(cmd.requirements.userPerms).join(", ").replace(/_/gi, " ")}\`.`);



    cmd.run(bot, message, args).catch(e => { return console.log(e) });

    bot.logger.log(`[${message.member.user.tag}] a utilisé la commande [${cmd.help.name}]`).catch(e => { return console.log(e) });

    message.delete()

}