const math = require('mathjs');
const Discord = require('discord.js');

module.exports = {
    name: "calculate",

    async run(client, message, args) {

        if (!args[0]) return message.channel.send('Please provide a question');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Please provide a **valid** question')
        }

        const embed = new Discord.MessageEmbed()
            .setColor(0x202020)
            .setTitle('Calculator')
            .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
            .addField('Answer', `\`\`\`css\n${resp}\`\`\``)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send(embed);
    }
}