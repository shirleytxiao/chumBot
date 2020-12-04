const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const config = require("./config.json");
const bot = new Discord.Client();
const queue = new Map();

bot.login(config.token);

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`)
}) 



//event listeners

// new member welcome
bot.on("guildMemberAdd", (member) => {
  member.send(`Welcome to the Ascend server! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`)
})

bot.on("message", (message) => {
  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  
  // greeting test
  if (command === "hi") {
    return message.reply("hey!")
  }  

  // help
  if (command === "help") {
    return message.reply('commands: \n\n!hi   --- greeting \n\n!kick <user>   --- kick user out of server \n\n!aboutme <1/2/3/4> <location> <committee>   --- greets you by your year (1, 2, 3, or 4), location, and committee.')
  }
  
  // kick 
  if (command === "kick") {
    let member = message.mentions.members.first();      
    if (!member) {
      return message.reply(`who are you trying to kick? You must mention a user.`)
    }
    if (!member.kickable) {
      return message.reply(`I can't kick this user. Sorry!`)
    }
    let reason = args.slice(1).join(" ");
    return member
      .kick(reason)
      .then(() => message.reply(`${member.user.tag} was kicked.`))
      .catch((error) => message.reply(`sorry, an error occured.`))
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
    return message.reply(`I see you're a ${year_name} from ${location} in the ${committee} committee.`);
  }

  // play music
  if (command === "play") {
    execute(message, serverQueue);
    return;
  } else if (command === "skip") {
    skip(message, serverQueue);
    return;
  } else if (command === "stop") {
    stop(message, serverQueue);
    return;
  }

  async function execute(message, serverQueue) {  
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }

    const songInfo = ytdl.getInfo(args[1]);
    const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
     };
    
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        var connection = voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  }

  function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }

  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }

  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
  
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
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
});