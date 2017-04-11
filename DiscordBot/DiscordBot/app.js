/*
 A crappy implementation of a discord bot
*/

// import the discord.js module
const Discord = require('discord.js');

// import filesystem api
const fs = require('fs');

//variables for deciding picture to reply with
var memeType = '';
var file = { attachment: '', name: '' };

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = 'Mjk5NzA3OTQyNzM4MDY3NDU3.C8h0Xg.Fuab4gVrwWhB3eif4uZFx2-gW68';

// Number of images in 'DankMemes'
var dankMemesNum = 3;
var min = 1;
var meme = 0;

// Generate a random number for dank meme user
function getRandomInt() {
    return Math.floor(Math.random() * (dankMemesNum - min)) + min;
}

// Read file for lover/hate counter
function updateFile(message, name, incrementType) {

    // Counter start at 0
    var counter = 0;

    // File paths for the files
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
            message.channel.sendMessage('How sad, this is the only way you can get points ...');
        } else {
            counter++;
            message.channel.sendMessage(name + '\'s sexy meter: ' + counter + '');
        }
    }
    //added this new conditional
    else if (incrementType === '2a') {
        console.log(message.author.username);
        if (message.author.username.toLowerCase().includes(name)) {
            message.channel.sendMessage('How sad, this is the only way you can get points ...');
        } else {
            counter += 2;
            console.log('Ran once');
            message.channel.sendMessage('That\'s hot... '+name + '\'s sexy meter: ' + counter + '');
        }
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


function postPicture(message,memeType) {
    if (memeType==='pokemon') {
        message.channel.sendMessage(("", { file: "DankMemes/1.jpg" }));
    }

    else if (memeType === 'money') {
        message.channel.sendMessage(("", { file: "DankMemes/3.jpg" }));
    }

    else if (memeType === 'gf') {
        message.channel.sendMessage(("", { file: "DankMemes/2.jpg" }));
    }
}

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
    console.log('I am ready!');
});

// create an event listener for messages
bot.on('message', message => {

    // Get the message in lower case
    var input = message.content.toLowerCase();
    // Split the text by space token into an array
    var inputArray = input.split(' ');

    // Help Commands
    if (message.content.toLowerCase() === '!help') {
        message.channel.sendMessage('Hello! I have the following commands available \n');
        message.channel.sendMessage('\t Contribute to someone\'s harem with \'!love [name]\'');
        message.channel.sendMessage('\t\t Unless you hate them. \'!hate charlie\' or \'!fuck charlie\' \n');
    }

    // !love increase love counter by one
    else if (inputArray[0].includes('!love')) {
        console.log(inputArray[1]);
        updateFile(message, inputArray[1], 'a');
    }

    // !hate decrease love counter by one
    else if (inputArray[0].includes('!hate')) {
        updateFile(message, inputArray[1], 's');
    }

    //!sex increase counter by 2
    else if (inputArray[0].includes('!sex') && !message.author.bot) {
        console.log(inputArray[1]);
        updateFile(message, inputArray[1], '2a');
    }

    // !fuck decrease counter by two
    else if (inputArray[0].includes('!fuck')) {
        updateFile(message, inputArray[1], '2s');
    }

    // !dank give me a dank meme
    else if (inputArray[0].includes('!dank')) {
        message.channel.sendMessage("", { file: "DankMemes/" + getRandomInt() + ".jpg" });
    }

    // get your avatar
    else if (message.content.toLowerCase() === 'what is my avatar') {
        // send the user's avatar URL
        message.reply(message.author.avatarURL);
    }

    else if (message.content.toLowerCase().includes('meme') && !message.author.bot) {
        meme++;
        message.channel.sendMessage('I bet you got that off of EbaumsWorld...\nA dank meme has been used ' + meme +' times.') 
    }

    else if (message.content.toLowerCase().includes('pokemon')) {
        memeType = 'pokemon';
        postPicture(message,memeType);
    }

    else if (message.content.toLowerCase().includes('girlfriend') || message.content.toLowerCase().includes('gf')) {
        memeType = 'gf';
        postPicture(message,memeType);
    }

    else if (message.content.toLowerCase().includes('money') || message.content.toLowerCase().includes('dollar')) {
        memeType = 'money';
        postPicture(message,memeType);
    }
});


// log our bot in
bot.login(token);