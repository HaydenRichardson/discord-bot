const Discord = require('discord.js');
const { mongo } = require('../../json/config.json');
const { Database } = require("quickmongo");
const db = new Database(mongo);

module.exports = {
    name: "nuke",
    async run(client, message, args) {

        const nukeChannel = message.channel;

        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('bruh.').then(message => message.delete({ timeout: 3000 }));
        if (message.channel.type === 'dm') return message.reply(`you cant use this command here.`)

        if (!nukeChannel.deletable) return message.channel.send("")

        await nukeChannel.clone().catch(err => console.log(err));
        await nukeChannel.delete().catch(err => console.log(err))
        // LOG
        let id = await db.get(`log_${message.guild.id}.id.0`)
        if (id === null) return;
        
        let Geo = new Discord.MessageEmbed()
            .setTitle(`Channel Nuked:`)
            .setColor("#FF0000")
            .setFooter(`Kick Log`, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`**Nuked By**: ${message.author.tag}`)

        //sends embed
       client.channels.cache.get(id).send({ embed: Geo });
    }
}