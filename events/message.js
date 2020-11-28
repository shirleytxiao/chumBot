export default (bot, message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
  
    // greeting test
    if (message.content === "test") {
        message.reply("hey!");
    };

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
  };