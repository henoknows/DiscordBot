/*
 A crappy implementation of a discord bot
*/

// import the discord.js module
const Discord = require('discord.js');

// import filesystem api
const fs = require('fs');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = '';

// Number of images in 'DankMemes'
var dankMemesNum = 3;
var min = 1;

// Generate a random number for dank meme user
function getRandomInt() {
    return Math.floor(Math.random() * (dankMemesNum - min)) + min;
}

// Read file for lover/hate counter
function updateFile(message, name, incrementType) {
    var counter = 0;
    var filePath = 'RoleInts/' + name + '.txt';
    console.log('Fail here ' + incrementType);
    try {
        counter = fs.readFileSync(filePath);
    } catch (err) {
        console.log('File does not exist. Create one');
        fs.openSync(filePath, 'w');
        counter = 0;
    }

    if (incrementType === 'a') {
        console.log(message.author.username);
        if (message.author.username.toLowerCase().includes(name)) {
            counter--; // A little hacky but works.
            message.channel.sendMessage('How sad, this is the only way you can get points...');
        }
        counter++;
        message.channel.sendMessage(name + '\'s sexy meter: ' + counter + '');
    }

    else if (incrementType === 's') {
        counter--;
        message.channel.sendMessage('Yeah that baka! ' + name + '\'s sexy meter: ' + counter + '');
    }

    else if (incrementType === '2s') {
        counter -= 2;
        message.channel.sendMessage('Yeah that baka! ' + name + '\'s sexy meter: ' + counter + '');
    }

    var options = { flag: 'w' };
    fs.writeFile(filePath, counter, options, function (err) {
        if (err) throw err;
        console.log('file saved');
    });
}


// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
    console.log('I am ready!');
});

// create an event listener for messages
bot.on('message', message => {

    // if the message is "ping",
    var input = message.content.toLowerCase();
    var inputArray = input.split(' ');

    // Help Commands
    if (message.content.toLowerCase() === '!help') {
        message.channel.sendMessage('Hello! I have the following commands available \n');
        message.channel.sendMessage('\t Contribute to someone\'s harem with \'!love [name]\'');
        message.channel.sendMessage('\t\t Unless you hate them. \'!hate charlie\' or \'!fuck charlie\' \n');
    }

    else if (inputArray[0].includes('!love')) {
        console.log(inputArray[1]);
        updateFile(message, inputArray[1], 'a');
    }

    else if (inputArray[0].includes('!hate')) {
        updateFile(message, inputArray[1], 's');
    }

    else if (inputArray[0].includes('!fuck')) {
        updateFile(message, inputArray[1], '2s');
    }

    else if (input.includes('dank meme')) {
        message.channel.sendMessage("", { file: "DankMemes/" + getRandomInt() + ".jpg" });
    }

    else if (message.content.toLowerCase() === 'what is my avatar') {
        // send the user's avatar URL
        message.reply(message.author.avatarURL);
    }
});


// log our bot in
bot.login(token);