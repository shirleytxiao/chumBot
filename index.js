const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const bot = new Discord.Client();

fs.readdir("./events/", (err, files) => {  
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    bot.on(eventName, (...args) => eventHandler(bot, ...args));
;})});

bot.login(config.token);

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`)
}) 



//event listeners

bot.on("message", (message) => {
  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  // greeting test
  bot.on("message", (message) => {
    if (message.content === "test") {
      message.reply("hey!")
    }
  })

  // new member welcome
  bot.on("guildMemberAdd", (member) => {
    member.send(`Welcome to the Ascend server! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`)
  })

  // prefix + commands
  bot.on("message", (message) => {
    // help
    if (command === "help") {
      return message.reply('commands: !')
    }
    
    // kick 
    if (command === "kick") {
      let member = message.mentions.members.first();      
      if (!member) {
        return message.reply(`Who are you trying to kick? You must mention a user.`)
      }
      if (!member.kickable) {
        return message.reply(`I can't kick this user. Sorry!`)
      }
      let reason = args.slice(1).join(" ");
      return member
        .kick(reason)
        .then(() => message.reply(`${member.user.tag} was kicked.`))
        .catch((error) => message.reply(`Sorry, an error occured.`))
    }

    // aboutme: year, location, committee
    if (command === "aboutme") {
      let [year, location, committee] = args;
      let year_name = "";
      switch (year) {
        case "1" :
          year_name = "freshman";
          break;
        case "2" :
          year_name = "sophomore";
          break;
        case "3" :
          year_name = "junior";
          break;
        case "4" :
          year_name = "senior";
          break;
      }
      message.reply(`Hello ${message.author.username}, I see you're a ${year_name} from ${location} in the ${committee} committee.`);
    }

    // event: create event & generate google calendar invite
      // ex) !event General Meeting in 5 hours
      // !event Social at 6 PM on Wednesday
      // !event Presentation on 11/21 at 7:00 PM

    // poll

    // !list: lists all future events made on this server, with links to each event msg

    // !delete: deletes event

    // !chum: suggests other user(s) with similar interests based on keywords
      // ex) !chum boba CSGO tennis photography
      // ex) !chum CS61A UGBA10
  })
});