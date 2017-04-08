/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = '';

var loveCharlie = 0;

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    console.log(message.author);
    if (message.content.toUpperCase() === 'HELP') {
        message.reply('Hello! I have the following commands available \n');
        message.reply('\t Contribute to the Charlie harem. Increment the counter with \'I love Charlie\' \n');
    }
});

// create an event listener for messages
bot.on('message', message => {
    // if the message is "ping",
    if (message.content.toLowerCase() === 'i love charlie') {
        loveCharlie++;
        message.channel.sendMessage('Charlie has been loved: ' + loveCharlie + ' times');
    }
});

// create an event listener for messages
bot.on('message', message => {
    // if the message is "what is my avatar",
    if (message.content === 'what is my avatar') {
        // send the user's avatar URL
        message.reply(message.author.avatarURL);
    }
});

// log our bot in
bot.login(token);