const { mongo } = require('../../json/config.json');
const { Database } = require("quickmongo");
const db = new Database(mongo);

module.exports = {
    name: "setprefix",

    async run (client, message, args) {
        
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No permission.")

        if(!args[0]) return message.channel.send('Please provide a new prefix');

        if(args[1]) return message.channel.send('The prefix can\'t have two spaces');

       // db.set(`prefix_${message.guild.id}`, args[0])
        db.set(`prefix_${message.guild.id}`, { id: args[0] })
        message.channel.send(`Successfully set new prefix to **${args[0]}**`)
    }
}