const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const cherrio = require('cheerio');
const { token } = require('./json/config.json');
const { readdirSync } = require('fs');
const { prefix } = require('./json/config.json')
const { join } = require('path');


client.commands = new Discord.Collection();


const funFiles = readdirSync(join(__dirname, 'commands\\fun')).filter(file => file.endsWith(".js"));
for (const file of funFiles) {
	const command = require(join(__dirname, 'commands\\fun', `${file}`));
	client.commands.set(command.name, command);
}


client.on('ready', () => {
	console.log('Bot online.')
	client.user.setActivity('Hayden Bot | !help', { type: "STREAMING", url: 'https://www.twitch.tv/mom625' })
})


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})
client.login(token);
