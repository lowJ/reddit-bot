const Discord = require('discord.js');
const bot = new Discord.Client();
const suf = "rr";
bot.login('MzM3Mzg4NjQyODk1MDAzNjQ4.DGb2Kg.vEcEhciroEodjFXASJvxDzWhSIg');

bot.on('ready', () => {
    console.log("Bot is ready");
});

var servers = {};

bot.on('message', (message)=>{
    var guildId = message.guild.id;
    if(!servers[message.guild.id]) servers[message.guild.id] = {
            currentPage:null,
    };
    
    var msgCaseSense = message.content;
    console.log(msgCaseSense);
    var argCaseSense = msgCaseSense.split(" ");
    var msg = message.content.toLowerCase();
    var arg = msg.split(" ");
    var server = servers[guildId];
    
    
    if(arg[0] == suf){
        if(arg[1] == "r"){
            getRedditJSON(arg[2], guildId);
            console.log("before timout");
            setTimeout(function(){
                //console.log(ob.kind);
                console.log("send msg");
                
                message.channel.sendMessage(server.currentPage.data.children[getRndInteger(0, 
                server.currentPage.data.children.length - 1)].data.url);
            }, 1000);
        }
        
        if(!isNaN(arg[1])){
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
 