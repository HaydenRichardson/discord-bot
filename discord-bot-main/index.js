const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./json/config.json');
const { readdirSync } = require('fs');
const { join } = require('path')
const { mongo, default_prefix } = require('./json/config.json');
const { Database } = require("quickmongo");
const db = new Database(mongo);


client.commands = new Discord.Collection();


const funFiles = readdirSync(join(__dirname, 'commands\\fun')).filter(file => file.endsWith(".js"));
for (const file of funFiles) {
	const command = require(join(__dirname, 'commands\\fun', `${file}`));
	client.commands.set(command.name, command);
}
const moderationFiles = readdirSync(join(__dirname, 'commands\\moderation')).filter(file => file.endsWith(".js"));
for (const file of moderationFiles) {
	const command = require(join(__dirname, 'commands\\moderation', `${file}`));
	client.commands.set(command.name, command);
}
const utilityFiles = readdirSync(join(__dirname, 'commands\\utility')).filter(file => file.endsWith(".js"));
for (const file of utilityFiles) {
	const command = require(join(__dirname, 'commands\\utility', `${file}`));
	client.commands.set(command.name, command);
}

db.on('ready', () => {
    console.log('Mongoose Ready!')
})

client.on('ready', () => {
	console.log('Bot online.')
	client.user.setActivity('Hayden Bot | !help', { type: "STREAMING", url: 'https://www.twitch.tv/mom625' })
})


client.on("message", async message => {

	if (message.author.bot) return;

	let prefix = await db.get(`prefix_${message.guild.id}.id`)

	if (prefix === null) prefix = default_prefix;

	const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);

	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);

	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).run(client, message, args);

	} catch (error) {
		console.error(error);
	}
})
client.login(token);