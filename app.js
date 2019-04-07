/*

 A crappy implementation of a discord bot

*/

// import the discord.js module
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// command prefix
var prefix = "!";

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

// Debug and warning handlers, these log debug messages and warnings to console ** COPY AND PASTED FROM URL **
bot.on("debug", (m) => console.log("[debug]", m));
bot.on("warn", (m) => console.log("[warn]", m));

// create an event listener for messages
bot.on('message', message => {

    var argsArray = message.content.slice(prefix.length).trim().split(" ");
    const command = argsArray.shift().toLowerCase();
    var args = argsArray.join(" ");
    console.log("id:" + message.author.id);

    if (command === 'ping') {
        message.channel.send('pong');
    }

    if (command === 'r6') {
        message.channel.send(ttsTalker());
        message.channel.send('!cleanup')
    }

    // Help Commands
    if (command === 'hey') {
        message.channel.send('aYyYyyYY BOIIIIII \n');
    }

    // tts Commands
    if (command === 'tts') {
        for (var i = 0; i < args.length; i += 150) {
            var newString = args.substring(i, i + 150);
            message.channel.send(newString, {
                tts: true,
                split: true
            });
        }
    }

    if (command === "join") {
        message.member.voiceChannel.join().then(()=>{
            msg.reply("Joined!");
        }).catch((ex)=>{
            msg.reply("Failed to join! " + ex);
        });;
    }

    if (command === "leave") {
        message.member.voiceChannel.leave();
    }

    if (command === "quote") {
        message.channel.fetchMessages({
            "limit": 100
        }).then(messages => {
            const averyMessages = messages.filter(msg => (msg.author.id == 112303879030403072));
            messagesLength = averyMessages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            console.log('Deletion of messages successful. Total messages deleted: ' + messagesLength);
            message.channel.send(averyMessages.array()[0], {});
        }).catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
        });
    }

    if (command === 'cleanup') {
        message.channel.fetchMessages().then(messages => {
            const botMessages = messages.filter(msg => msg.author.bot);
            message.channel.bulkDelete(botMessages)
            .then(() => {
                // Logging the number of messages deleted on both the channel and console.
                messagesDeleted = botMessages.array().length; // number of messages deleted
                console.log('Deletion of messages successful. Total messages deleted: ' + messagesDeleted)
            })
            .catch(console.error);

        }).catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
        });
    }
});


function ttsTalker(){
    var montagneMessage = ['/tts its a mi montagne','/tts my montagne is a charging','/tts mama mia meatball montagne'];
    var rand = Math.floor((Math.random() * 3))
    console.log(rand);
    return montagneMessage[rand];
}


console.log("Logging in with: " + auth.token);
bot.login(auth.token);