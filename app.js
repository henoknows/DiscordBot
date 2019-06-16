/*

 A crappy implementation of a discord bot

*/

// import the discord.js module
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const opus = require('node-opus');
const opusscript = require('opusscript');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

var conn = null;

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

    // tts Commands
    if (command === 'tts') {
        message.delete();
        for (var i = 0; i < args.length; i += 150) {
            var newString = args.substring(i, i + 150);
            message.channel.send(newString, {
                tts: true,
                split: true
            });
        }
    }

    if (command === "join") {
        message.delete();
        var voiceChannel = message.member.voiceChannel;
        voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playFile('./voiceClips/heyGuys.mp3', {volume: 1.0});
            dispatcher.on("end", end => console.log("Completed playmp3"));
        }).catch((ex)=>{
            console.log("Failed to join! " + ex);
        });;
    }

    if (command === "burp") {
        message.delete();
        var botRef = bot;
        if(botRef.voiceConnections.has(message.guild.id)) {
            var connection = botRef.voiceConnections.get(message.guild.id)
            var dispatcher = connection.playFile('./voiceClips/burp.mp3', {volume: 9.0});
        }
    }

    if (command === "ihu") {
        message.delete();
        var botRef = bot;
        if(botRef.voiceConnections.has(message.guild.id)) {
            var connection = botRef.voiceConnections.get(message.guild.id)
            var dispatcher = connection.playFile('./voiceClips/ihu.mp3', {volume: 3.0});
        }
    }

    if (command === "mmm") {
        message.delete();
        var botRef = bot;
        if(botRef.voiceConnections.has(message.guild.id)) {
            var connection = botRef.voiceConnections.get(message.guild.id)
            var dispatcher = connection.playFile('./voiceClips/holyCrap.mp3', {volume: 1.0});
        }
    }

    if (command === "leave") {
        message.delete();
        message.member.voiceChannel.leave();
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


console.log("Logging in with: " + auth.token);
bot.login(auth.token);