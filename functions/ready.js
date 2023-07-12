const fs = require("fs");

module.exports = {
  loadInteraction: async function(bot, dirname) {
    const onlyGuild = false; // ONLY ADD SLASH COMMANDS TO A SPECIFIC GUILD
    const guildID = "724752395556487220"; // ADD THE SLASH COMMANDS TO THIS GUILD, (If onlyGuild is true).

    const slashFiles = fs.readdirSync(dirname).filter((file) => file.endsWith(".js"));
    let count = 0;

    console.log("\nInteraction:\n");
    for (const file of slashFiles) {
      const slash = require(`${dirname}/${file}`);

      let slashCommand;

      if (slash.config.options) {
        slashCommand = {
          name: slash.config.name,
          description: slash.config.description,
          options: slash.config.options,
        };
      } else {
        slashCommand = {
          name: slash.config.name,
          description: slash.config.description,
        };
      }

      if (!onlyGuild || bot.guilds.cache.get(guildID)) {
        try {
          await bot.application?.commands.create(slashCommand);
          bot.interactions.set(slash.config.name, slash);
          console.log(`${count+1} : ${slash.config.name} Loaded`);
          count += 1;
        } catch (err) {
          console.log(err);
        }
      }
    }
  },
};