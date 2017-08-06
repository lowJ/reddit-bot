# reddit-bot
A discord bot for getting reddit stuff

Setup
1. Download my file, create a new directory and put my file in it, this will be the directory of the bot.
1. Install Node js. (https://nodejs.org/en/).
1. In command line cd to the bot directory, then run "npm init" to initalize your directory with Node files.
1. Run "npm install request --save", this will install the request module.
1. Run "npm install --save discord.js", this will install the discord.js module.
1. Now you need to create your own discord app. (https://discordapp.com/developers/applications/me).
1. After filling in a name go to the next page, make sure it is a bot user (click "create bot user").
1. You can check the "Public Bot" if you want other people to be able to add your bot.
1. Take note of your token and client id, and go into the index.js file on line 5 where it says "bot.login".
1. Delete anything in the parenthesis and put token in, make sure its in quotes.
1. Next go to (https://discordapi.com/permissions.html) this will allow you to create permissions for your bot and add it to any of your servers(if you have enough perms).
1. For basic's you can select everything in text permissions. Then go to the bottom left and put in your client id. Click the link to add the bot.
1. To turn the bot on, make sure you are cd in your bot directory, run "node index.js".

Other

You can change the command prefixes (default is "rr"). Go in index.js change the "suf" variable.
