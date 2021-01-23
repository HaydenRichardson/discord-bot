const Discord = require('discord.js')
const BOT_COMMAND = '!gif';
const GIPHY_API_KEY = process.env.GIPHY_API_KEY

module.exports = {
    name: "gif",
 
    async run (client, message, args){
 
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
 
    const giphy_response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query_term}&limit=20&offset=0&rating=pg-13&lang=en`);
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
 
 
 
    
}
