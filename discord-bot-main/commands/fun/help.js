const pagination = require('discord.js-pagination');
const Discord = require('discord.js');
const { prefix } = require('../../json/config.json');

module.exports = {
    name: "help",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('Staff')
        .addField(prefix+'`nothing`', 'here')
        .setTimestamp()

        const admin = new Discord.MessageEmbed()
        .setTitle('Admin')
        .addField(prefix+'`nothing`', 'here')
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('Fun')
        .addField(prefix+'`gif`', 'Generates specific gif', )
        .addField(prefix+'`meme`', 'Generates a random meme')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setTitle('Utlity')
        .addField(prefix+'`nothing`', 'here')
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