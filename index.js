require("dotenv").config();

const permInteger = '271961121';

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

fs.readdir("./events/", (err, files) => {  
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
;})});

client.login(process.env.BOT_TOKEN);


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!")
  }
})


client.on("guildMemberAdd", (member) => {
  member.send(
    `Welcome to the Ascend server! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`
  )
})


client.on("message", (message) => {
  if (message.content.startsWith("!kick")) {
    const member = message.mentions.members.first()
    if (!member) {
      return message.reply(
        `Who are you trying to kick? You must mention a user.`
      )
    }
    if (!member.kickable) {
      return message.reply(`I can't kick this user. Sorry!`)
    }
    return member
      .kick()
      .then(() => message.reply(`${member.user.tag} was kicked.`))
      .catch((error) => message.reply(`Sorry, an error occured.`))
  }
})


let counter = 0;

//event listeners
client.on(`message`, (receivedMessage) => 
{
    if (receivedMessage.channel.id == '756683017233235989') { // change channel id
      count(receivedMessage);
}
});

function count(receivedMessage) {
    counter++;
    receivedMessage.channel.send(counter);
}
