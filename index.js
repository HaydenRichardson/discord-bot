const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request')
const cheerio = require('cheerio')
const { meme } = require('memejs')
const fetch = require('node-fetch');
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

const BOT_COMMAND = '!gif';
const prefix = '!';


client.on('ready', () => {
  console.log('I am ready!');
}); 
  


client.on('message', (msg) =>{


    if(msg.content.toLowerCase().startsWith(BOT_COMMAND))
    {
        if(Math.random() > 0.8)
        {
            msg.react("❤️");
        }
        
        if (msg.content.toLowerCase() != BOT_COMMAND)
        {
            const search_term = msg.content.substring(BOT_COMMAND.length).trimStart();

            get_gif(search_term)
            .then(img => {
                if(msg.channel.id === '545031442065915955')
                {
                    msg.channel.send("", {files: [`${img}`]});
                }
                else
                {
                    msg.channel.send(`${img}`);
                }
            })
            .catch(err => {
                console.error(err)
                msg.channel.send(`Couldn't find any GIFs for that 😢`);   
            });
        }
        else
        {
            // give random gif!
            random_gif()
            .then(img => {
                if(msg.channel.id === '545031442065915955')
                {
                    msg.channel.send("", {files: [`${img}`]});
                }
                else
                {
                    msg.channel.send(`${img}`);
                }
            })
            .catch(err => console.error(err));
        }
        
    }
});



async function get_gif(search_term)
{
    const query_term = encodeURIComponent(search_term);

    const giphy_response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query_term}&limit=100&offset=0&rating=r&lang=en`);
    const giphy_json = await giphy_response.json();

    if(giphy_json.data.length > 0)
    {   
        const rand = Math.floor(Math.random()*(Math.min(giphy_json.data.length, 10)));
        const img_url = giphy_json.data[rand].images.fixed_height.url;
        return img_url;
    }
    else
    {
        throw new Error("No GIFs available");
    }
    

    
}


async function random_gif()
{
    const giphy_response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=&rating=r`);
    const giphy_json = await giphy_response.json();
    const img_url = giphy_json.data.images.fixed_height.url;

    return img_url;
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

}

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
 

