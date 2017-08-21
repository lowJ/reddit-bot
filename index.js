const Discord = require('discord.js');
const bot = new Discord.Client();
//edit suf to change the suffix for commands
const suf = "rr";
bot.login('MzM3Mzg4NjQyODk1MDAzNjQ4.DGb2Kg.vEcEhciroEodjFXASJvxDzWhSIg');



var servers = {};

bot.on('ready', () => {
    console.log("Bot is ready");
    bot.user.setGame("Type '" + suf + "' for help.");
});

bot.on('message', (message)=>{
    if(!servers[message.guild.id]){
        servers[message.guild.id] = {
            currentPage:null,
        };  
        //getRedditJSON("https://reddit.com/hot.json", message.guild.id);
    }
    var guildId = message.guild.id;
    var msgCaseSense = message.content;
    var argCaseSense = msgCaseSense.split(" ");
    var msg = message.content.toLowerCase();
    var arg = msg.split(" ");
    var server = servers[guildId];
    //parse invaldid tabs
    if(arg[0] == suf){
        if(arg[1] == "s" || arg[1] == "set"
        || arg[1] == "g" || arg[1] == "get"){
            if(arg[2]){
                if(arg[3] && (arg[2] == "frontpage" || arg[2] == "front")){
                    console.log("1");
                    var url = "https://reddit.com/" + arg[3] + ".json";
                    getRedditJSON(url, guildId);
                    setTimeout(function(){
                        sendEmbed(4650299, "Attempting", "Attempting to get: " + url);
                    }, 1000);
                }
                else if(arg[2] =="front" || arg[2] == "frontPage"){
                    console.log("2");
                    getRedditJSON("https://reddit.com/.json", guildId);
                    setTimeout(function(){
                        sendEmbed(4650299, "Attempting", "Attempting to get: https://reddit.com/.json");
                    }, 1000);
                }
                else if(arg[2] && arg[3]){
                    console.log("3");
                    var url = "https://reddit.com/r/" + arg[2] + "/" + arg[3] + ".json";
                    getRedditJSON(url, guildId);
                    setTimeout(function(){
                        sendEmbed(4650299, "Attempting", "Attempting to get: " + url);
                    }, 1000);
                }
                else if(arg[2]){
                    console.log("4");
                    var url = "https://reddit.com/r/" + arg[2] + "/hot.json";
                    getRedditJSON(url, guildId);
                    setTimeout(function(){
                        sendEmbed(4650299, "Attempting", "Attempting to get: " + url);
                    }, 1000);
                }
            }
            else{
                sendEmbed(12393521, ":exclamation:Error:exclamation:",
                "Invalid parameters for get/set");
            }
        }
        
        else if(arg[1] == "next" || arg[1] == "prev" || arg[1] == "previous"){
            if(server.currentPage != null){
                if(server.currentPage.hasOwnProperty("data")){
                    var selectedPage = server.currentPage.data;
                    var curUrl = server.currentUrl;
                    //curUrl = "https://www.reddit.com/?count=2666&before=t3_6uyicn";
                    if(curUrl.includes("?count=")){
                        var numStart = curUrl.indexOf("?count=") + 7;
                        var numEnd = curUrl.indexOf("&", numStart);
                        var count = Number(curUrl.substring(numStart, numEnd));
                        curUrl = curUrl.substring(0, curUrl.indexOf("?count="));
                        if(arg[1] == "next" && selectedPage.after != null){
                            count += 25;
                            var url2 = curUrl + "?count=" + count + "&after=" + selectedPage.after;
                            getRedditJSON(url2, guildId);
                            setTimeout(function(){
                                sendEmbed(4650299, "Attempting", "Attempting to get: " + url2);
                            }, 1000);
                        }
                        //not properley working
                        else if(arg[1] == "prev" || arg[1] == "previous" && selectedPage.before != null){
                            count -= 25;
                            var url3 = curUrl + "?count=" + count + "&before=" + selectedPage.before;
                            getRedditJSON(url3, guildId);
                            setTimeout(function(){
                                sendEmbed(4650299, "Attempting", "Attempting to get: " + url3);
                            }, 1000);
                            
                            //fix this
                            // if(count == 0){
                            //     count = 26;
                            // }
                        }
                        
                    }
                    else{
                        if(arg[1] == "next"){
                            var url2 = curUrl + "?count=25&after=" + selectedPage.after;
                            getRedditJSON(url2, guildId);
                            setTimeout(function(){
                                sendEmbed(4650299, "Attempting", "Attempting to get: " + url2);
                            }, 1000);
                        }
                        else if(arg[1] == "prev" || arg[1] == "previous"){
                            var url3 = curUrl + "?count=25&before=" + selectedPage.before;
                            getRedditJSON(url3, guildId);
                            setTimeout(function(){
                                sendEmbed(4650299, "Attempting", "Attempting to get: " + url3);
                            }, 1000);
                        }
                    }
                }
                else{
                    sendEmbed(16774459, " ", "Invalid current page page");
                }
                
            }
            else{
                sendEmbed(16774459, " ", "There is no current page");
            }
        }
        
        else if(arg[1] == "random" || arg[1] == "rand" || arg[1] == "r"){
            if(server.currentPage != null){
                if(server.currentPage.hasOwnProperty("data")){
                    var selectedPage = server.currentPage.data;
                    if(selectedPage.children){
                        message.channel.sendMessage(selectedPage.children[getRndInteger(0, 
                        selectedPage.children.length -1)].data.url);
                    }
                }
            }
            else{
                sendEmbed(16774459, " ", "There is no current page");
                // getRedditJSON("https://reddit.com/hot.json", guildId);
                // setTimeout(function(){
                //     if(true){
                //         var selectedPage = server.currentPage.data;
                //         if(server.currentPage.data.children){
                //             message.channel.sendMessage(selectedPage.children[getRndInteger(0, 
                //             selectedPage.children.length -1)].data.url);
                //         }
                //     }
                //     else{
                //         sendEmbed(12393521, ":exclamation:Error:exclamation:", "An error occureed");
                //     }
                // }, 2000);
            }
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
            if(server.currentPage){
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
                sendEmbed(12393521, ":exclamation:Error:exclamation:",
                "There is no page, get one with \"" + suf + " g" + "[subreddit]\"");
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
    var maxLength = 2048;
    var page = servers[id].currentPage.data;
    var list;
    var added;
    var maxLengthTitle = Math.floor(2048/page.children.length);
    var numbering = 0;
    var i = 0;
    for(i = 0; i < page.children.length; i++){
        //console.log(page.children[i].data.title);
        numbering+= 1;
        added = numbering + ". " + page.children[i].data.title + "\n";
        if(added.length > maxLengthTitle){
            added = numbering + ". " + page.children[i].data.title;
            added = added.substring(0, maxLengthTitle - 5) + "...\n";
        }
        list += added;
    }
    return list;
}
//give url, will set the currentPage to the JSON object of the url.
function getRedditJSON(urll, id){
    var page;
    var request = require('request');
    console.log("starting request: " + urll);
    request(urll, function (error, response, body) {
        console.log("finished request");
        //add way to catch errors
        
        if (!error && response.statusCode == 200) {
            page = JSON.parse(body);
            setTimeout(function(){
                servers[id].currentPage = page;
                servers[id].currentUrl = urll;
                console.log("setting currentPage");
                console.log('error:', error);
                console.log("first post is: " + page.data.children[0]
                .data.url);
            }, 3000);
            
        }
        else{
            console.log("Error:" + error);
        }
    }) 
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
 