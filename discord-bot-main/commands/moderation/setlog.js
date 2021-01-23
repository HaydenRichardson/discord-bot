const { mongo } = require('../../json/config.json');
const { Database } = require("quickmongo");
const db = new Database(mongo);

module.exports = {
    name: "setlog",

    async run(client, message, args) {

       // if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You don\'t have permission to use that.')

        if (!args[0]) return message.reply('Missing channelid.').then(message => message.delete({ timeout: 5000 }));

        //  db.set(`log_${message.guild.id}`, { id: args})
        db.set(`log_${message.guild.id}`, { id: args })
        message.channel.send(`Successfully set new log channel.`)

    }
}