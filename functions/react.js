const Discord = require("discord.js");
// const fetch = require('node-fetch');
// const config = require("../Storage/config.json");
const https = require('https');

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

}

module.exports = functions;