const config = require("../../Storage/config.json");
const fs = require("fs")
const pathModule = require("path")
const db = JSON.parse(fs.readFileSync(pathModule.join(__dirname, "../../", "Storage/sftpOeuvre.json")));

exports.run = async(bot, message, args) => {

    switch(args[0]) {
        case "addOeuvre":
            switch(args.slice(2, -1).join(" ") === undefined){
                case true:
                message.channel.send("You need to specify the name of the oeuvre,  ex: t!add addOeuvre test_2 V1");
                break;
            }
            switch(args.slice(-1)[0] === undefined){
                case true:
                message.channel.send("You need to specify the version of the oeuvre,  ex: t!add addOeuvre test_2 V1");
                break;
            }
            const oeuvreNamingInCase = args.slice(2, -1).join(" ");

            async function add(plateforme) {
                switch(args.slice(-1)[0].toUpperCase() == "V1" || args.slice(-1)[0].toUpperCase() == "BAT") {
                    case true:
                        let oeuvreExist = false;
                        if(db[message.guild.id][plateforme]){
                            for (const index of Object.keys(db[message.guild.id][plateforme])) {
                                oeuvreName = db[message.guild.id][plateforme][index].oeuvrename;
                                if (oeuvreNamingInCase.toLowerCase() === oeuvreName) {
                                    oeuvreExist = true;
                                }
                            }
                        }
            
                        switch(!oeuvreExist){
                            case true:
                                const id = Object.keys(db[message.guild.id][plateforme]).length + 1;
            
                                const role = await message.guild.roles.create({
                                    name: oeuvreNamingInCase,
                                    color: 'BLUE',
                                });
            
                                Object.assign(db[message.guild.id][plateforme], { [id]: { oeuvrename: oeuvreNamingInCase, version: args.slice(-1)[0], roleID: role.id } });
            
                                fs.writeFileSync(pathModule.join(__dirname, "../../", "Storage/sftpOeuvre.json"), JSON.stringify(db, null, 2));
                            message.channel.send(`The oeuvre **__${oeuvreNamingInCase}__** has been added with version **${args.slice(-1)[0]}**`);
                            break;
                            case false:
                            message.channel.send(`The oeuvre **__${oeuvreNamingInCase}__** already exist in the database, it will not be added again`);
                            break;
                        }
                        break;
                    default:
                        message.channel.send("the version of the oeuvre should be V1 or BAT, ex: t!add addOeuvre test_2 V1");
                        break;
                }
            }
            

            switch (args[1].toLowerCase()) {
                case "makma":
                    console.log(db[message.guild.id].hasOwnProperty("makma"));
                    if(!db[message.guild.id].hasOwnProperty("makma")){
                        db[message.guild.id]["makma"] = {};
                        break;
                    }
                    add("makma")
                    break;
                case "charon":
                    if(!db[message.guild.id].hasOwnProperty("charon")){
                        db[message.guild.id]["charon"] = {}
                    }
                    add("charon")
                    break;
                case "babel":
                    if(!db[message.guild.id].hasOwnProperty("babel")){
                        db[message.guild.id]["babel"] = {}
                    }
                    add("babel")
                    break;
            }
            break;

        case "deleteOeuvre":
            if(args[1] === undefined) {
                message.channel.send("You need to specify the name of the oeuvre you want to delete, ex: t!add deleteOeuvre test_2");
                break;
            }
            if(message.content === undefined) {
                message.channel.send("You need to specify the name of the oeuvre you want to delete, ex: t!add deleteOeuvre test_1");
            }
            const oeuvreNamingOutCase = args.slice(1).join(" ");
            console.log(oeuvreNamingOutCase, `\t ${message.content}`);
            let plateforme = async function () {
                Object.keys(db[message.guild.id]).forEach(async key => {
                for (let index = 1; index <= Object.keys(db[message.guild.id][key]).length; index++) {
                            if(db[message.guild.id][key][index].oeuvrename === oeuvreNamingOutCase) {
                                // console.log(message.guild.roles.get(db[message.guild.id][key][index].roleID));
                                // const role = await message.guild.roles.cache.get(db[message.guild.id][key][index].roleID);
                                // await console.log(role);
                                // await role.remove(""); //.find(key => key === db[message.guild.id][key][index].roleID)
                                // console.log(db[message.guild.id][key][index].roleID);
                                await message.guild.roles.delete(db[message.guild.id][key][index].roleID)
                                await delete db[message.guild.id][key][index];
                                await fs.writeFileSync(pathModule.join(__dirname, "../../", "Storage/sftpOeuvre.json"), JSON.stringify(db, null, 2));
                                return await message.channel.send(`The oeuvre **__${oeuvreNamingOutCase}__** has been deleted`)  ;
                            }
                        }
            })};
            plateforme()
            // for (let plateforme of db) {
            //     console.log(plateforme);
            //     for (let index = 1; index <= Object.keys(db[message.guild.id][plateforme]).length; index++) {
            //         if(db[message.guild.id][plateforme][index].oeuvrename === oeuvreNamingOutCase) {
            //             delete db[message.guild.id][plateforme][index];
            //             message.channel.send(`The oeuvre **__${oeuvreNamingOutCase}__** has been deleted`);
            //             fs.writeFileSync("./Storage/sftpOeuvre.json", JSON.stringify(db, null, 2));
            //         }
            //     }
            // }
            break;
        default:
            return message.channel.send(`If you want to add a serie, you should tap :\n${config.prefix}add addOeuvre <name of the serie> <version you want, ex : V1 or BAT>`)
    }    

};


exports.help = {
    name: "addOeuvreSFTP",
    aliases: ['add'],
    description: `Cette commande sert à ajouter des oeuvres pour le script sftp-Scraper : ${config.prefix}add [nom de l'oeuvre] [V1 ou BAT]`
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: ['MANAGE_MESSAGES']
}