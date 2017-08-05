const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login('MzM3Mzg4NjQyODk1MDAzNjQ4.DGb2Kg.vEcEhciroEodjFXASJvxDzWhSIg');

bot.on('ready', () => {
    console.log("Bot is ready");
});

bot.on('message', (message)=>{
    var msgCaseSense = message.content;
    var argCaseSense = message.split(" ");
    var msg = message.content.toLowerCase();
    var arg = msg.split(" ");
    
});