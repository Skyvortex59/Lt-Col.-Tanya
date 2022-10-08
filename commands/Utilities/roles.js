const { MessageActionRow, MessageSelectMenu, MessageButton, EmbedBuilder, ButtonBuilder } = require('discord.js');
const { prefix } = require("../../Storage/config.json");
const db = require("../../Storage/roleDB.json");
const fs = require("fs");

exports.run = async(bot, message, args, interaction) => {

    const servID = `${message.guild.id}`;
    
    if (args[0] == "embed") {

        const embedRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('Assign')
                .setLabel('Primary')
                .setStyle('PRIMARY')
            );
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Assign Roles')
            .setDescription('If you want to assign a role, click the button "Assign"');

        await message.channel.send({ content: 'You can now assign to you a role, go pick one of them ^^', ephemeral: true, embeds: [embed], components: [embedRow] })
    }


    async function storeData(path, rolesFill, emoteFill ,categoryFill) {
        try {
            dataDB = await JSON.parse(fs.readFileSync(path, {encoding: "utf-8"}));
            // console.log("Enregistrement db : \n", dataDB[servID]);
            message.client.guilds.cache.forEach(async elmt => {
                emoteFill = await elmt.emojis.cache.get(emoteFill.match(/\d+/)[0]);
                if(emoteFill){
                    if(!dataDB[servID]) {
                    // await console.log(`before data : \n`, db ,`\ndb.messageID : \n`, JSON.stringify(db[0].roles.messageID), `\ndataDB : \n`, dataDB, `\n dataDB.messageID : \n`, dataDB["0"].roles.messageID);
                    // servID: {
                    //    "roles" : [
                    //         {
                    //             "emote" : emoteFill, 
                    //             "role" : rolesFill, 
                    //             "category" : categoryFill
                    //         }
                    //     ]
                    // }
                    
    
                    dataDB[servID] = await {"roles" : [{"emote" : emoteFill, "role" : rolesFill, "category" : categoryFill}]};
                    
                    // await console.log(dataDB[servID]);
                    // {
                    //     roles: [ { emote: [GuildEmoji], role: 'test', category: 'testCategory' } ]
                    // }
                    dataDB = await JSON.stringify(dataDB)
                    // await console.log(dataDB);
                    await fs.writeFileSync(path, dataDB)
    
    
                    // }
    
                    // dataStock = JSON.stringify(dataStock)
    
                    // fs.writeFileSync(path, JSON.stringify(db))
                // } else if(dataDB[message.guild.id].category.roles == {}) {
                    // db[message.guild.id] = {
                    //     category: {name: categoryFill, roles: {}}
                    // }
                    // fs.writeFileSync(path, JSON.stringify(data))
                //     return;
    
                } 
                if(dataDB[servID]) {
                    for(let elmt of dataDB[servID].roles) {
                        if(elmt.role == rolesFill && elmt.category == categoryFill) {
                            return message.channel.send(`You can't add ⌈${rolesFill}⌋ role in ⌈${categoryFill}⌋ category, because there already exists`)
                        }
                        // Dans le cas où le role a le même nom mais n'est pas dans la même catégory
                        if(elmt.role == rolesFill && elmt.category != categoryFill) {
                            await dataDB[servID].roles.push({"emote" : emoteFill, "role" : rolesFill, "category" : categoryFill});
                            
                            dataDB = await JSON.stringify(dataDB)
                            return await fs.writeFileSync(path, dataDB).then(message.channel.send(`The role has been add to the database`))
                        }
                        // L'inverse, le cas où le role a un nom différent, mais est dans la même category
                        else {
                            await dataDB[servID].roles.push({"emote" : emoteFill, "role" : rolesFill, "category" : categoryFill});

                            dataDB = await JSON.stringify(dataDB)
                            return await fs.writeFileSync(path, dataDB).then(message.channel.send(`The role has been add to the database`))
                        }
                    }
                }
                }

                
            })

            

        } catch (err) {
            console.error(err)
        }
    }


    if(args[0].toLowerCase() == "addroles") {
        if(!args[1]) {
            return message.channel.send(`If you want to add a roles, you should tap :\n${prefix}roles addRoles <name of the roles> <emote of the role> <category of the role>`)
        }
        else if(!args[2]) {
            return message.channel.send(`If you want to add a roles, you should tap :\n${prefix}roles addRoles <name of the roles> <emote of the role> <category of the role>`)
        }
        else if(!args[3]) {
            return message.channel.send(`If you want to add a roles, you should tap :\n${prefix}roles addRoles <name of the roles> <emote of the role> <category of the role>`)
        }
        else {
            
            let filter = m => m.author.id === message.author.id
            await message.channel.send({ content: `Are you sure to create ⌈${args[1]} in ${args[3]}⌋ roles, with this emote ⌈${args[2]}⌋ ?`, ephemeral: true}).then(async () => {
                const collected = await message.channel.awaitMessages({ filter: filter, max: 1 })
                collected.forEach(elmt => {
                    response = elmt.content;
                })
                if(response.toLowerCase() == "yes" || response.toLowerCase() == "y") {
                    console.log(`entry yes\targs[1] : ${args[1]}\targs[2] : ${args[2]}`);

                    return storeData("./Storage/roleDB.json", args[1], args[2], args[3])
                }
                if(response.toLowerCase() == "no" || response.toLowerCase() == "n") {
                    await message.channel.send({content: "What do you want ? Choose calery, you have a last chance ^^"}).then(async () => {
                        const collectedNo = await message.channel.awaitMessages({ filter: filter, max: 1 })
                        collectedNo.forEach(elmt => {
                            responseNo = elmt.content;
                        })
                        var argsNo = responseNo.split(" ")
                        return storeData("./Storage/roleDB.json", argsNo[0], argsNo[1], argsNo[2])
                    })}
                else {
                    return message.channel.send("Timeout")
                }
            })
        }
    } 
    if(args[0].toLowerCase() == "delroles") {
        try {
            async function deleteRoles(path, delRole, targetCategory) {
                dataDB = await JSON.parse(fs.readFileSync(path, {encoding: "utf-8"}));
                
                for(let targetRole of dataDB[servID].roles) {
                    if(targetRole.role == delRole && targetRole.category == targetCategory) {
                        await dataDB[servID].roles.splice(dataDB[servID].roles.indexOf(targetRole), 1);

                        dataDB = await JSON.stringify(dataDB)
                        return await fs.writeFileSync(path, dataDB)
                    }
                }
            }
            

            let filter = m => m.author.id === message.author.id
            await message.channel.send({ content: `Are you sure to delete ⌈${args[1]}⌋ of ⌈${args[2]}⌋ category ?`, ephemeral: true}).then(async () => {
                const collected = await message.channel.awaitMessages({ filter: filter, max: 1 })
                collected.forEach(elmt => {
                    response = elmt.content;
                })
                if(response.toLowerCase() == "yes" || response.toLowerCase() == "y") {
                    // console.log(`entry yes\targs[1] : ${args[1]}\targs[2] : ${args[2]}`);

                    return deleteRoles("./Storage/roleDB.json", args[1], args[2])
                }
                if(response.toLowerCase() == "no" || response.toLowerCase() == "n") {
                    await message.channel.send({content: "What do you want ? Choose calery, you have a last chance ^^"}).then(async () => {
                        const collectedNo = await message.channel.awaitMessages({ filter: filter, max: 1 })
                        collectedNo.forEach(elmt => {
                            responseNo = elmt.content;
                        })
                        var argsNo = responseNo.split(" ")
                        return deleteRoles("./Storage/roleDB.json", argsNo[0], argsNo[1])
                    })}
                else {
                    return message.channel.send("Timeout")
                }
            })

        } catch (error) {
            console.log(error);
        }
        
    }

}

exports.help = {
    name: "roles",
    aliases: ['r'],
    description: `Cette commande sert à dire pong : ${prefix}roles`
}

exports.requirements = {
    botOwner: true,
    botPerms: [],
    userPerms: ["MANAGE_MESSAGES"]
}