const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request')
const cheerio = require('cheerio')

const prefix = '!';


client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  
  if (message.content.startsWith(prefix + "gif"))
  {
    
    let splitWord = message.toString().split(" ");
    let gifWord   = "";

    
    for( var i = 1; i < splitWord.length; i++)
    {
      if(i > 1)
      {
        gifWord = gifWord + "+";
      }

      gifWord = gifWord + splitWord[i];
    }

    request("http://api.giphy.com/v1/gifs/search?q=" + gifWord + "&api_key=" + config.giphyKey + "&limit=100", function (error, response, body)
    {
      if (!error && response.statusCode == 200)
      {
        // Convert body to JSON object
        let jsonUrl = JSON.parse(body);

        // Get random number to choose GIF
        let totGif = jsonUrl.data.length;

        if(totGif > 100)
        {
          totGif = 100;
        }

        let ranNum = Math.floor(Math.random() * totGif);

        message.channel.sendMessage(jsonUrl.data[ranNum].url);
      }
    });
  }
   
   
 

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();
    
       if (message.content.startsWith(prefix + 'img')){
        if (!args){
          message.channel.send(`Please include what image you are searching for`)
        }
        let results = `${args}`
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
