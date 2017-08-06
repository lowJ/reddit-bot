const Discord = require('discord.js');
const bot = new Discord.Client();
//edit suf to change the suffix for commands
const suf = "rr";
bot.login('MzM3Mzg4NjQyODk1MDAzNjQ4.DGb2Kg.vEcEhciroEodjFXASJvxDzWhSIg');

bot.on('ready', () => {
    console.log("Bot is ready");
});

var servers = {};

bot.on('message', (message)=>{
    if(!servers[message.guild.id]) servers[message.guild.id] = {
            currentPage:null,
    };
    var guildId = message.guild.id;
    var msgCaseSense = message.content;
    var argCaseSense = msgCaseSense.split(" ");
    var msg = message.content.toLowerCase();
    var arg = msg.split(" ");
    var server = servers[guildId];
    
    if(arg[0] == suf){
        if(arg[1] == "r"){
            getRedditJSON(arg[2], guildId);
            console.log("before timout");
            setTimeout(function(){
                message.channel.sendMessage(server.currentPage.data.children[getRndInteger(0, 
                server.currentPage.data.children.length - 1)].data.url);
            }, 1000);
        }
        
        else if(arg[1] == "list" || arg[1] == "l"){
            if(server.currentPage){
                sendEmbed(4216564,"",createList(guildId));
                //message.channel.sendMessage(createList(guildId));
            }
            else{
                sendEmbed(12393521, ":exclamation:Error:exclamation:",
                "There is no page, get one with \"" + suf + " g" + "[subreddit]\"");
            }
        }
        
        else if(!isNaN(arg[1])){
            console.log("if number is true");
            var selectedPage = server.currentPage.data;
            var i = Math.round(parseFloat(arg[1])) - 1; 
            if(selectedPage.children.length - 1 >= i){
                message.channel.sendMessage(selectedPage.children[i].data.url);
            }
            else{
                sendEmbed(12393521, ":exclamation:Error:exclamation:", "Invalid number");
            }
        }
        else{
            sendEmbed(12393521, ":exclamation:Error:exclamation:", "Invalid command");
        }
    }
    
    function sendEmbed(col, titl, desc){
        message.channel.send({embed:{
            color: col,
            author:{
                name: bot.user.username,
                icon_url: bot.user.avatarURL,
            },
            title: titl,
            description: desc,
        }});
    }
});
//list titles of all posts on currentPage
function createList(id){
    var page = servers[id].currentPage.data;
    var list;
    var numbering = 0;
    var i = 0;
    for(i = 0; i < page.children.length; i++){
        console.log(page.children[i].data.title);
        numbering+= 1;
        list += numbering + ".   " + page.children[i].data.title + "\n";
    }
    return list;
}
//give url, will set the currentPage to the JSON object of the url.
function getRedditJSON(url, id){
    var page;
    var request = require('request');
    request(url, function (error, response, body) {
        console.log("in request");
        if (!error && response.statusCode == 200) {
            page = JSON.parse(body);
            setImmediate(function(){
                servers[id].currentPage = page;
                console.log("sfs" + servers[id].currentPage.kind);
            });
            
        }
        else{
            console.log("Error:" + error);
        }
    }) 
    console.log("request not successful");
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
 