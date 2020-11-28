const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const bot = new Discord.Client();

fs.readdir("./events/", (err, files) => {  
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    bot.on(eventName, (...args) => eventHandler(bot, ...args));
  })
});

bot.login(config.token);
