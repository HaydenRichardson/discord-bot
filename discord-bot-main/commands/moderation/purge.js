const Discord = require('discord.js');
const { mongo } = require('../../json/config.json');
const { Database } = require("quickmongo");
const db = new Database(mongo);
module.exports = {
    name: "purge",

    async run(client, message, args) {

     //   if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('bruh.').then(message => message.delete({ timeout: 3000 }));
        if (message.channel.type === 'dm') return message.reply(`you cant use this command here.`)

        const amount = args.join(" ");

        if (!amount) return message.reply('bruh')

        if (amount > 100) return message.reply(`xd`)

        if (amount < 1) return message.reply(`bruh`)

        await message.channel.messages.fetch({ limit: amount }).then(messages => {
            message.channel.bulkDelete(messages
        

            )
        });
        // LOG
        let id = await db.get(`log_${message.guild.id}.id.0`)
        if (id === null) return;

        let Geo = new Discord.MessageEmbed()
            .setTitle(`Purged:`)
            .setColor("#fbff00")
            .setFooter(`Purged by: ${message.author.tag}`, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`**Purged By**: ${message.author.tag}`)

        //sends embed
        client.channels.cache.get(id).send({ embed: Geo });
    }
}