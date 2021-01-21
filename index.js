const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request')
const cheerio = require('cheerio')

const prefix = '!';


client.on('ready', () => {
  console.log('I am ready!');
});

 
   
 

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();
    
    if (message.content.startsWith(prefix + 'img')){
        let results = 'cursed images';
        image(message, results);
    }

    
    

})

    function image(message, results) {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q="+ results,
            method: "GET",
            headers: {
                Accept: "text/html",
                "User-Agent":"Chrome"
            }

        };
        request(options, function (error, response, responseBody){
            if(error){
                return console.log('An Error Has Occured.')
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length)
            .fill(0)
            .map((v, i) => links.eq(i).attr('href'));
            if (!urls.length){
                return console.log('No Results Found')
            }
                const embed = new Discord.MessageEmbed()
                .setTitle('Results')
                .setImage(urls[Math.floor(Math.random() * urls.length)])
                .setColor('#080e0e');
                message.channel.send(embed);
        })
            

    

    

};
 
client.login(process.env.BOT_TOKEN);
