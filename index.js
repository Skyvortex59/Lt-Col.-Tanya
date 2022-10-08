const { Client, GatewayIntentBits, Collection } = require("discord.js");
const config = require("./Storage/config.json");
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
    ]
});

bot.commands = new Collection();
bot.aliases = new Collection();
bot.event = new Collection();
bot.interactions = new Collection();

const loadCommands = require("./functions/commands.js");
const loadEvents = require("./functions/events.js");
// const loadInteraction = require("./functions/interaction.js")

bot.logger = require("./functions/log.js");

const load = async() => {
    await loadCommands.run(bot);
    await loadEvents.run(bot);
}

bot.color = require("./Storage/color.json");
bot.functions = require("./functions/functions.js");
bot.interaction = require("./events/interactionCreate.js")


bot.login(config.token);
load();