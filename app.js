/*

 A crappy implementation of a discord bot

*/

// import the discord.js module
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

// import filesystem api
const fs = require('fs');

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


    console.log("Command: " + command);
    console.log("args: " + args);

    if (command === 'ping') {
        message.channel.send('pong');
    }

    // Help Commands
    if (command === 'hey') {
        message.channel.send('aYyYyyYY BOIIIIII \n');
    }

    // tts Commands
    if (command === 'tts') {
        message.channel.send(args, {
            tts: true,
            split: true
        });
    }
});

console.log("Logging in with: " + auth.token);
bot.login(auth.token);