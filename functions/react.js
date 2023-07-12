const Discord = require("discord.js");
const { connect } = require("http2");
const fs = require("fs");
const { googlekey } = require("../Storage/config.json")
const https = require('https');
const SFTPClient = require("./sftpConnection.js");
const sftpLog = require("../Storage/sftpLog.json");
const sftpInfoJSON = require("../Storage/sftpInfo.json");
const {EmbedBuilder} = require('discord.js');
const pathModule = require("path");
const sftpOeuvre = JSON.parse(fs.readFileSync(pathModule.join(__dirname, "../", "Storage/sftpOeuvre.json")));
// const indexJSON = JSON.parse(fs.readFileSync(pathModule.join(__dirname, "../", "Storage/index.json")));
const { convertArrayToCSV } = require('convert-array-to-csv');


var functions = {
    sortie: async function(bot, message) {
        // const includeChapter = [
        //     'chap',
        //     'Chap',
        //     'prochaine sortie',
        //     'sortie',
        //     'c quand la sortie',
        //     'prochain chapitre',
        //     'suite'
        // ];

        // includeChapter.some(element => {
        //     if (message.content.toLowerCase().includes(element) && !message.author.bot) {
        //         const readyEmote = message.client.guilds.cache.get('323426566975782912').emojis.cache.get('832745343803850753');
        //         message.channel.send(`${readyEmote}`);

        //         const postCriptum = new Discord.EmbedBuilder()
        //             .setColor('#FF0000')
        //             .setAuthor({ name: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL() })
        //             .setTitle(`Petit rappel.`)
        //             .addFields([{
        //                 name: "Si je répond à un message ne demandant pas la suite d'un(e) chapitre/vidéo ou encore une sortie.",
        //                 value: "Ce n'est donc pas de ma faute, je ne suis qu'un robot maltraité par son maître."
        //             }])
        //             .setTimestamp()

        //         message.channel.send({ embeds: [postCriptum] });

        //     } //Si une personne dit les mot dans la variable include, le bot lui envoiera l'emote :QuandCestPret
        // })
    },

    // reacting: async function(bot, message) {
    //     const amour = [
    //         "t'es le meilleur",
    //         "je t'aime",
    //         "on t'aime",
    //         "tu es le meilleur",
    //         "le meilleur bot c'est",
    //     ];

    //     let userMentionned = message.mentions.users.first();

    //     amour.forEach(async aiElement => {
    //         if (message.content.toLowerCase().startsWith(aiElement) && userMentionned === bot.user) {
    //             let url = `https://api.tenor.com/v1/random?q=blushing-anime-girl`


    //             let response = await fetch(url);

    //             let result = await response.json();

    //             const aiGIF = new Discord.EmbedBuilder()
    //                 .setTitle("Oh... merci, je suppose...")
    //                 .setImage(`${result.results[0].media[0].gif.url}`)
    //                 .setColor('#8B0000')


    //             message.channel.send({ embeds: [aiGIF] }).then(console.log(result.results[0].itemurl))
    //         }
    //     })

    //     console.log(message);


    //     if (message.member && message.member.roles.cache.get('778716777021440010') && userMentionned) {
    //         if (message.guild.members.cache.get(userMentionned.id).roles.cache.get('724715926943170561')) {
    //             const banEmote = bot.guilds.cache.get('323426566975782912').emojis.cache.get('725008995655614484');
    //             message.reply(`Pas touche aux fouteurs de merde ${banEmote}!`);
    //         }
    //     }
    //     if (message.member && message.member.roles.cache.get('724715926943170561') && userMentionned) {
    //         if (message.guild.members.cache.get(userMentionned.id).roles.cache.get('778716777021440010')) {
    //             const patEmote = bot.guilds.cache.get('323426566975782912').emojis.cache.get('725008925748887572');
    //             message.reply(`Tu es sur la bonne voie ${patEmote} !`);
    //         }
    //     }

    // },

    // pedoCard: async function(bot, message) {
    //     const includePedoWord = [
    //         'loli', '𝚕𝚘𝚕𝚒', '𝑙𝑜𝑙𝑖', '𝐥𝐨𝐥𝐢', '𝗅𝗈𝗅𝗂', '𝓁𝑜𝓁𝒾', '𝒍𝒐𝒍𝒊', '𝘭𝘰𝘭𝘪', '𝗹𝗼𝗹𝗶', '𝓁𝑜𝓁𝒾', 'lolι', 'ʟᴏʟɪ', '𝙡𝙤𝙡𝙞', '𝓵𝓸𝓵𝓲', '𝑙𝑜𝑙𝑖', '𝕝𝕠𝕝𝕚', '𝔩𝔬𝔩𝔦', 'ᥣoᥣι', '𝖑𝖔𝖑𝖎', 'lolı', 'lσli', 'ˡᵒˡᶤ', 'ꙆoꙆɩ', 'ꙆoꙆɩ', 'ⓛⓞⓛⓘ', 'ƖᴏƖɪ', '🅻🅾🅻🅸', 'ꮮꮻꮮꮖ', 'ᒪOᒪI', 'ℓσℓι', '𝑙𝜎𝑙𝜄', 'lσli', 'lσlι', 'ⳑⲟⳑⲓ', 'łøłɨ', 'ŁФŁł', '101!', '🇱​🇴​🇱​🇮​', 'l̷o̷l̷i̷', 'lσli', 'ʟσʟı', '🅛🅞🅛🅘', 'lσlι', 'ƖσƖι', '乚口乚工', 'ๅoๅᴉ', '🄻🄾🄻🄸', 'lølι', 'ᚳᛜᚳᛁ', 'ⳑⲟⳑⳕ', 'lɔli', '꒒ꂦ꒒ꂑ', 'ʅσʅι', 'ƖօƖí', 'Ն૦Նɿ', 'ʟօʟɨ', 'lѳlі', 'LOLI', 'lσlι', 'lɔlɩ', '꒒ꄲ꒒꒐', 'łøłı', 'Ŀ🖤ĿĪ', 'ƖօƖí', 'l๏lเ', 'lɔlɪ', 'ԼƠԼƖ', 'lօlﻨ', '꒒ꉻ꒒꒐', ' 🇱 🅾️ 🇱 ℹ', 'ᒐOᒐꙆ', 'l⃫o⃫l⃫i⃫', 'լԾլᎥ', 'ḷöḷï', '乚ロ乚ﾉ', 'ӀօӀì', 'ᒪOᒪI', 'lọlị', 'ԼഠԼ౹', 'ʅơʅɪ', 'ιΘιί', 'lօlἶ', 'ᒪ⌷ᒪ𐌠', 'l໐li', 'ረዐረጎ', '⒧⒪⒧⒤', '꒒ꊿ꒒꒐', 'l⊕lï', 'Ļ◊ĻÎ', 'lølí', 'ɼoɼᴉ', 'ĿØĿĪ', 'lỗlị', 'ŁøŁĩ', 'ℓσℓï', '꒒ꂦ꒒ꀤ', 'ʟоʟі', '꒒ꆂ꒒ꂑ', '꒒ꁏ꒒ꀤ', '|¤|¡', 'ᒪᓍᒪᓰ', 'լΘլЇ', 'ᒪᓎᒪᓿ', '꒒ꄱ꒒꒐', 'łὄłἷ', 'lΦli', 'ĺőĺí', '|͇ ͇ |͇̿ ͇̿ ͇̿||͇ ͇ |', 'ŁØŁɪ', 'ʅԾʅɿ', 'Ioli',
    //         'shota',
    //         'petite fille',
    //         'petit garçon',
    //         'moins de 13 ans',
    //         'boku no pico',
    //     ];

    //     const dontInclude = [
    //         'aime pas',
    //         'haie'
    //     ];

    //     includePedoWord.some(element => {
    //         dontInclude.some(elmt => {
    //             if (message.content.toLowerCase().includes(element) && !message.content.toLowerCase().includes(elmt) && !message.author.bot) {
    //                 return message.channel.send('https://giphy.com/gifs/police-fbi-agent-stop-right-there-26O4tnUKH85uVQ8MFl');

    //                 // const readyEmote = message.client.guilds.cache.get('323426566975782912').emojis.cache.get('832745343803850753');
    //                 // message.channel.send(`${readyEmote}`);

    //             } //Si une personne dit les mot dans la variable include, le bot lui envoiera l'emote :QuandCestPret
    //             // if(message.content.toLowerCase().includes(element) + message.content.toLowerCase().includes(elmt) && !message.author.bot){
    //             //     message.channel.send('https://gph.is/2CvYaA6');
    //             // }
    //         })
    //     })
    // },

    fakeGift: async function(bot, message) {
        if (message.content.toLowerCase().includes('https://') && !message.author.bot) {
            function detectURLs(message) {
                var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
                return message.match(urlRegex)
            };
            urlLink = detectURLs(message.content);
            if(urlLink[0].toLowerCase().startsWith("https://discord.gg/")) {
                const inviteURL = urlLink[0].replace("https://discord.gg/", "https://discord.com/invite/");
                https.get(inviteURL, (response) => {
                    let data = '';
                    response.on('data', (chunk) => {
                        data += chunk;
    
                    });
    
                    response.on('end', () => {
                        // console.log(data)
                        let except = [
                            "crypto",
                            "nudes",
                            "+18",
                            "thicc",
                            "sex",
                            "hentai",
                            "🔞",
                            "giveaway",
                            "tiktok18",
                        ]
                        for (const exElmt of except) {
                            if(data.toLowerCase().includes(exElmt)) {
                                // console.log(exElmt);
                                let member = message.guild.members.cache.get(message.author.id);
                                let botMember = message.guild.members.cache.get(bot.user.id);
                                let roles = {}
                                for (let elmt of member.roles.cache){
                                    // liste.push(elmt)
                                    for (let elm of elmt) {
                                        roles[elm.id] = elm.name
                                    }
                                }
                                delete roles["undefined"]
    
                                let domRoleID = Object.keys(roles)[0]
    
                                message.delete();
    
                                // Quand le méchant est une modo
                                if (botMember.roles.highest.comparePositionTo(member.roles.highest) < 0) {
                                    // console.log("MODO")
                                    message.author.send(`${roles[domRoleID]} ! Vous avez surement été hacké ! \nLe Cercle, vous conseille de vérifier vos données et de les changer pour votre sécurité (A2F, changer votre mot de passe, enlever vos coordonnées bancaires, etc)\nVotre bot vous souhaite une bonne continuation.`);
                                } // Quand le méchant est un normies
                                else {
                                    // console.log("normies")
                                    message.author.send(`Vous avez été kick parce que vous avez spammé des liens non conformes au règles de notre serveur.\nLe Cercle, vous conseille de vérifier vos données et de les changer pour votre sécurité (A2F, changer votre mot de passe, enlever vos coordonnées bancaires, etc)\nVotre bot vous souhaite une bonne continuation.`)
                                        .then(member.kick("Vous avez spam un lien frauduleux pour des abonnements discord gratuit."));
                                }
    
    
                                console.log("Les liens fraudleux ont été supprimés ^^.")
                                return message.channel.send("Tout le spamming pour rejoindre un quelquonque serveur vient d'être supprimé.");
    
                                }
                            }
                        })

                    }).on('error', (error) => {
                        console.log(error);
                    });
            }
            else{
                for (const elmt of urlLink) {
                    https.get(elmt, (response) => {
                        let data = '';
                        response.on('data', (chunk) => {
                            data += chunk;
        
                        });
        
                        response.on('end', () => {
                            // console.log(data)
                            
                            if(!elmt.toLowerCase().startsWith("https://discord.com/"))
                                if (data.toLowerCase().match(/[dԁɗ][iіíï][sʂ][cс][oо][r][dԁɗ]/) && data.toLowerCase().match(/[gġ][iіíï][f][t]/) || data.toLowerCase().match(/[ɴn𝗇𝚗ｎₙ][i𝗂𝚒ｉᵢ][tᵗ𝗍𝚝ｔₜ][rʳ𝗋𝚛ɾᵣ][oᴏ𝗈о𝚘ⲟｏₒ]/)) {
                                    if (!elmt.toLowerCase().startsWith('discord.gift')) {
        
                                        let member = message.guild.members.cache.get(message.author.id);
                                        let botMember = message.guild.members.cache.get(bot.user.id);
        
                                        message.delete();
        
                                        // Quand le méchant est une modo
                                        if (botMember.roles.highest.comparePositionTo(member.roles.highest) < 0) {
                                            // console.log("MODO")
                                            message.author.send("Vous avez probablement été hacké. \nFaites tout pour sécuriser votre compte (A2F, changez votre mot de passe, enlevez vos coordonnées bancaires, etc)\nVotre bot vous souhaite une bonne continuation.");
                                        } // Quand le méchant est un normies
                                        else {
                                            // console.log("normies")
                                            message.author.send("Vous avez été kick.\nVous avez probablement été hacké. \nFaites tout pour sécuriser votre compte (A2F, changez votre mot de passe, enlevez vos coordonnées bancaires, etc)\nVotre bot vous souhaite une bonne continuation.")
                                                .then(member.kick("Vous avez spam un lien frauduleux pour des abonnements discord gratuit."));
                                        }
        
        
                                        console.log("Les liens fraudleux ont été supprimés ^^.")
                                        return message.channel.send('Tous les liens frauduleux pour avoir un abonnement discord nitro gratuit ont été supprimé.')
        
                                    } else { return; }
                                } 
                        });
        
        
        
                    }).on('error', (error) => {
                        console.log(error);
                    });
                }
            }
            
            

        }

    },
    womp: async function(bot, message) {
        if (message.content.toLowerCase().includes("womp") && !message.author.bot) {
            return message.channel.send({content : `Womp Womp~`, files : ["./Storage/videos/womp.mp4"]})
        }
    },
    sftpScraper: async function(bot) {
        bot.setMaxListeners(20);
        for (const sftpServer in sftpLog) {
            const serverInfo = sftpLog[sftpServer][0];
            const host = serverInfo.host || serverInfo.hostMakma || serverInfo.hostCharon || serverInfo.hostBabel;
            const port = serverInfo.port || serverInfo.portMakma || serverInfo.portCharon || serverInfo.portBabel;
            const username = serverInfo.username || serverInfo.usernameMakma || serverInfo.usernameCharon || serverInfo.usernameBabel;
            const password = serverInfo.password || serverInfo.passwordMakma || serverInfo.passwordCharon || serverInfo.passwordBabel;
      
            const sftpClient = new SFTPClient();
        
            async function connectSFTP(host, port, username, password) {
                await sftpClient.connect({
                    host: host,
                    port: port,
                    username: username,
                    password: password,
                    tryKeyboard: true,
                });
                
                let sftpInfo = sftpInfoJSON;

                async function sendEmbed(embed, roleID){
                    bot.guilds.cache.get("986025460574068786").channels.cache.get("1069626338941599856").send({ content: `<@&${roleID}>`, ephemeral: false, embeds: [embed] });
                }
                
                async function add(files, oeuvreName, roleID, path) {
                    console.log("it's ok");
                    let sftpInfo = sftpInfoJSON;
                    for (const file of files) {
                        // Vérifie si le fichier existe déjà dans sftpInfo.json
                        let found = Object.values(sftpInfo).some(entry => entry.filename === file);
                        if (!found) {
                            async function getTimestamp(filePath) {
                                try {
                                    const fileStats = await sftpClient.client.stat(filePath);
                                    return fileStats.modifyTime;
                                } catch (err) {
                                    console.log(`Failed to get timestamp for file ${filePath}:`, err);
                                    return null;
                                }
                            }
                            const timestamp = await getTimestamp(path);
                            const id = await Object.keys(sftpInfo).length + 1;
                            sftpInfo[id] = {
                                filename: file,
                                timestamp: timestamp
                            };

                            const uniqueEntries = {};
                            const existingFilenames = new Set();

                            for (const [id, entry] of Object.entries(sftpInfoJSON)) {
                                if (!existingFilenames.has(entry.filename)) {
                                    existingFilenames.add(entry.filename);
                                    uniqueEntries[id] = entry;
                                }
                            }
                
                            await fs.writeFileSync(pathModule.join(__dirname, "../", "Storage/sftpInfo.json"), JSON.stringify(uniqueEntries, null, 2));
                
                            const DateBase = await new Date(sftpInfo[id].timestamp);
                
                            const embed = await new EmbedBuilder()
                                .setColor("#f00020")
                                .setTitle(`Du nouveau contenu a été posté !`)
                                .addFields([
                                    {
                                        name: `${oeuvreName}`,
                                        value: `*chapitre* : __${file}__`
                                    },
                                    {
                                        name: 'Date de création',
                                        value: `${DateBase.getDate() +
                                            "/" + (DateBase.getMonth() + 1) +
                                            "/" + DateBase.getFullYear() +
                                            " " + DateBase.getHours() +
                                            ":" + DateBase.getMinutes() +
                                            ":" + DateBase.getSeconds()}`
                                    }
                                ]);
                            // Appel de la nouvelle fonction pour envoyer l'embed
                            await sendEmbed(embed, roleID);
                        }
                    }
                }
                
                
                
                const interval = setInterval(async () => {

                    const repositories = await sftpClient.listFiles("./SMARTOON/");
                    let version = ["V1", "BAT"];
                    for(const versionElmt of version) {
                        for (const dir of repositories) {
                            if(dir.match(versionElmt)) {
                                const dirPath = await sftpClient.listFiles(`./SMARTOON/${dir.match(versionElmt).input}/`);

                                switch(Object.keys(sftpOeuvre[bot.guilds.cache.get("986025460574068786").id]).some(key => key === sftpServer)) {
                                    case true:
                                        
                                        let oeuvreNames = [];
                                        
                                            for (let id in sftpOeuvre[bot.guilds.cache.get("986025460574068786").id][sftpServer]) {
                                                let oeuvreName = sftpOeuvre[bot.guilds.cache.get("986025460574068786").id][sftpServer][id].oeuvrename;
                                                // console.log(bot.guilds.cache.get("724752395556487220").id);
                                                let oeuvreVersion = sftpOeuvre[bot.guilds.cache.get("986025460574068786").id][sftpServer][id].version;
                                                let roleID = sftpOeuvre[bot.guilds.cache.get("986025460574068786").id][sftpServer][id].roleID;
                                                if(oeuvreVersion === versionElmt) {
                                                    oeuvreNames.push([oeuvreName, roleID]);
                                                }
                                            }
                                        

                                        // console.log(oeuvreNames); 
                                        
                                        for (const dirOeuvre of dirPath) {
                                            for(let info of oeuvreNames) {
                                                switch(dirOeuvre.match(info[0]) != undefined) {
                                                    case true:
                                                        sftpClient.listFiles(`./SMARTOON/${dir.match(versionElmt).input}/${dirOeuvre.match(info[0]).input}/`)
                                                            .then(dirChapter => {
                                                                const intervalAdd = setInterval(async function() {
                                                                    try {
                                                                        add(dirChapter, dirOeuvre.match(info[0]).input, info[1],`./SMARTOON/${dir.match(versionElmt).input}/${dirOeuvre.match(info[0]).input}/`);
                                                                        console.log("it's not ok");
                                                                        clearInterval(intervalAdd);
                                                                    } catch (err) {
                                                                        console.log(err)
                                                                    }
                                                                }, 6000 );
                                                            })
                                                            .catch(err => {
                                                                console.log(err)
                                                            });
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            }
                                        }                                        
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }}

                    clearInterval(interval);
                }
                , 60000 );
                
            }
            connectSFTP(host, port, username, password)
        }
    },
    // tempo: async function(bot, message) {
    //     if (message.content.toLowerCase().includes('https://') && !message.author.bot && message.content.toLowerCase().startsWith("playlist")) {
    //         function detectURLs(message) {
    //             var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    //             return message.match(urlRegex)
    //         };
    //         playlistURL = detectURLs(message.content)[0];

    //         playlistID = playlistURL.match(/list=.+/g)[0].replace("list=", "")

    //         var pageToken = 1
    //         var dataTreat = []
    //         var data = ""

    //         do {
    //             if(pageToken == 1) {
    //                 requestAPI = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistID}&key=${googlekey}`
    //                 await https.get(requestAPI, (response) => {
    //                     response.on('data', (chunk) => {
    //                         data += chunk;
        
    //                     });
        
    //                     response.on('end', async () => {
    //                         data = JSON.parse(data)
    //                         totalResults = data.pageInfo.totalResults;
    //                         let page = Math.ceil(totalResults / 50);
    //                         // dataTreat.push(data.items.)
    //                         for (const info of data.items) {
    //                             // console.log(`${info.snippet.title}\t${info.snippet.position}\t${info.contentDetails.videoId}`);
    //                             dataTreat.push({name:info.snippet.title, position:info.snippet.position+1, link:`https://www.youtube.com/watch?v=${info.contentDetails.videoId}`})
    //                         }
    //                         console.log("ok in");
    //                         pageToken = await data.nextPageToken;
    //                         }).on('error', (error) => {
    //                         console.log(error);
    //                     })
    //                 });
    //             }
    //             else {
    //                 pageToken = await data.nextPageToken;
    //                 console.log(pageToken);
    //                 // console.log(pageToken);
                    
    //                 requestAPI = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=${pageToken}&playlistId=${playlistID}&key=${googlekey}`
    //                 // console.log(anotherRequest);
    //                 await https.get(requestAPI, (response) => {
    //                     response.on('data', (chunk) => {
    //                         data = chunk;
        
    //                     });
        
    //                     response.on('end', () => {
    //                         data = JSON.parse(data)
    //                         console.log("ok");
    //                         // for (const anotherInfo of data.items) {
    //                         //     // console.log(`${info.snippet.title}\t${info.snippet.position}\t${info.contentDetails.videoId}`);
    //                         //     dataTreat.push({name:anotherInfo.snippet.title, position:anotherInfo.snippet.position+1, link:`https://www.youtube.com/watch?v=${anotherInfo.contentDetails.videoId}`})
    //                         // }
    //                         // const csvFromArrayOfObjects = convertArrayToCSV(dataTreat);
    //                         // // console.log(csvFromArrayOfObjects);
    //                         // fs.writeFileSync(pathModule.join(__dirname, "../", "Storage/TouhouPlaylist.csv"), csvFromArrayOfObjects)
                            
    //                         // pageTokenForJSON = data.nextPageToken
    //                         // console.log(pageTokenForJSON);
                            
    //                         // const indexPageToken = {
    //                         //     index: pageTokenForJSON
    //                         // }
    //                         // fs.writeFileSync(pathModule.join(__dirname, "../", "Storage/index.json"), JSON.stringify(indexPageToken))
                            
                        
    //                     }).on('error', (error) => {
    //                         console.log(error);
    //                     })
                        
    //                 });
    //             }
    //         }while(data.nextPageToken != undefined);
            
    //         // // console.log(requestAPI);
    //         // var dataTreat = []
    //         // https.get(requestAPI, (response) => {
    //         //     let data = ""
    //         //     response.on('data', (chunk) => {
    //         //         data += chunk;

    //         //     });

    //         //     response.on('end', async () => {
    //         //         data = JSON.parse(data)
    //         //         totalResults = data.pageInfo.totalResults;
    //         //         let page = Math.ceil(totalResults / 50);
    //         //         // dataTreat.push(data.items.)
    //         //         for (const info of data.items) {
    //         //             // console.log(`${info.snippet.title}\t${info.snippet.position}\t${info.contentDetails.videoId}`);
    //         //             dataTreat.push({name:info.snippet.title, position:info.snippet.position+1, link:`https://www.youtube.com/watch?v=${info.contentDetails.videoId}`})
    //         //         }
    //         //         if(page > 1) {

    //         //             do {
    //         //                 var pageToken = data.nextPageToken;
    //         //                 // console.log(pageToken);
                            
    //         //                 requestAPI = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=${pageToken}&playlistId=${playlistID}&key=${googlekey}`
    //         //                 // console.log(anotherRequest);
    //         //                 https.get(requestAPI, (response) => {
    //         //                     response.on('data', (chunk) => {
    //         //                         data = chunk;
                
    //         //                     });
                
    //         //                     response.on('end', () => {
    //         //                         data = JSON.parse(data)
    //         //                         console.log("ok");
    //         //                         for (const anotherInfo of data.items) {
    //         //                             // console.log(`${info.snippet.title}\t${info.snippet.position}\t${info.contentDetails.videoId}`);
    //         //                             dataTreat.push({name:anotherInfo.snippet.title, position:anotherInfo.snippet.position+1, link:`https://www.youtube.com/watch?v=${anotherInfo.contentDetails.videoId}`})
    //         //                         }
    //         //                         const csvFromArrayOfObjects = convertArrayToCSV(dataTreat);
    //         //                         // console.log(csvFromArrayOfObjects);
    //         //                         fs.writeFileSync(pathModule.join(__dirname, "../", "Storage/TouhouPlaylist.csv"), csvFromArrayOfObjects)
                                    
    //         //                         // pageTokenForJSON = data.nextPageToken
    //         //                         // console.log(pageTokenForJSON);
                                    
    //         //                         // const indexPageToken = {
    //         //                         //     index: pageTokenForJSON
    //         //                         // }
    //         //                         // fs.writeFileSync(pathModule.join(__dirname, "../", "Storage/index.json"), JSON.stringify(indexPageToken))
                                    
                                
    //         //                     }).on('error', (error) => {
    //         //                         console.log(error);
    //         //                     })
                                
    //         //                 });
    //         //             }while(data.nextPageToken != undefined)
    //         //         }


    //         //     }).on('error', (error) => {
    //         //         console.log(error);
    //         //     })
    //         // });
            
    //     }
    // }

}
module.exports = functions;
// "piccoma-makma" : [
  //   {
  //     "hostMakma" : "piccoma.exavault.com",
  //     "portMakma" : "22",
  //     "ipMakma" : "67.208.93.232",
  //     "usernameMakma" : "STUDIOMAKMA",
  //     "passwordMakma" : "9AyERq6mysSg4hYq"
  //   }
  // ],
  // "piccoma-charon" : [
  //   {
  //     "hostCharon" : "piccoma.exavault.com",
  //     "portCharon" : "22",
  //     "ipCharon" : "67.208.93.232",
  //     "usernameCharon" : "STUDIOCHARON",
  //     "passwordCharon" : "7GmqZwDL2RXGgAwmLf2W"
  //   }
  // ],

