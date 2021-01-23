const Discord = require('discord.js');
const { mongo } = require('../../json/config.json');
const { Database } = require("quickmongo");
const db = new Database(mongo);



module.exports = {
    name: "kick",

    async run(client, message, args) {

        if (!message.member.hasPermission("KICK_MEMBERS")) return
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send('Please specify a user');

        if (!member) return message.channel.send(`Couldn\'t find ${args}`);
        if (!member.kickable) return message.channel.send(`Couldn\'t kick ${args}`);

        if (member.id === message.author.id) return message.channel.send('Bruh, you can\'t kick yourself..');

        let reason = args.slice(1).join(" ");

        if (reason === undefined) reason = 'Unspecified';

        message.channel.send(`Kicked ${args}!`);
        // LOG
        let id = await db.get(`log_${message.guild.id}.id.0`)
        if (id === null) return;
        
        let Geo = new Discord.MessageEmbed()
            .setTitle(`User Kicked:`)
            .setColor("#EF6446")
            .setFooter(`Kicked by: ${message.author.tag}`, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`User Kicked: ${args}
        Kicked By: ${message.author.tag}
        Reason: ${reason}`)

        //sends embed
       client.channels.cache.get(id).send({ embed: Geo });
    }
}