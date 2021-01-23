const Discord = require('discord.js')
const gifSearch = require('gif-search');
module.exports = {
    name: "gif",
 
    async run (client, message, args){

        if(!args[0]) return message.channel.send('Please provide some text');

        gifSearch.random(`${args}`).then(gifurl => {


                let Embed = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setTitle(`**Gif!**`)
                    .setColor(`0x922a31`)
                    .setImage(gifurl)
                    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send(Embed)

        })

    }
}