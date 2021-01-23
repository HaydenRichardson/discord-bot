const pagination = require('discord.js-pagination');
const Discord = require('discord.js');
const { mongo, default_prefix } = require('../../json/config.json');
const { Database } = require("quickmongo");
const db = new Database(mongo);

module.exports = {
    name: "help",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category
        let prefix = await db.get(`prefix_${message.guild.id}.id`)

        if (prefix === null) prefix = default_prefix;

        const moderation = new Discord.MessageEmbed()
        .setTitle('Staff')
        .addField(prefix+'`kick`', 'Kicks a member from your server via mention or ID')
        .addField(prefix+'`purge`', 'Purges messages')
        .addField(prefix+'`nuke`', 'Nukes channel')
        .setTimestamp()

        const admin = new Discord.MessageEmbed()
        .setTitle('Admin')
        .addField(prefix+'`setlog`', 'Sets a log channel')
        .addField(prefix+'`setprefix`', 'Set bot prefix')

        const fun = new Discord.MessageEmbed()
        .setTitle('Fun')
        .addField(prefix+'`gif`', 'Generates specific gif', )
        .addField(prefix+'`meme`', 'Generates a random meme')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setTitle('Utlity')
        .addField(prefix+'`calculate`', 'Discord calculator', )
        .setTimestamp()

        const pages = [
                moderation,
                admin,
                fun,
                utility,
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}