/*
/   KirBot
/   Final project for OOP
/   main.js starts the bot, loads commands, and connects to discord's server using node.js
*/

const fs = require('fs');
const Discord = require('discord.js'); 
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_VOICE_STATES],
    disableMentions: 'everyone', }); //discord require bots to be given intents, defining what events the application receives
const cooldowns = new Discord.Collection(); // a collection of command cooldown times

const { Player } = require("discord-music-player"); // player object for music player
const player = new Player(client, {
    leaveOnEnd: false,
    leaveOnEmpty: false,
    leaveOnStop: false,
    timeout: 60,
    volume: 50 // keeps the bot from leaving when tracks are skipped etc.
}); //create player
client.player = player; //easier to call later


const prefix = '!!';
const token = 'OTU2NzA4NTcwNDYyODIyNDIx.Yj0KSQ.BtYmTw0GIM8AD3JwMxTKJy9P0AA';

client.commands = new Discord.Collection(); // Collection() extends Map, implemented in discord.js lib
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));// go through commands folder and add each file to commandFiles

for (const file of commandFiles) {
    const command = require(`./commands/${file}`); // add command to collection for each js file in ./commands
    client.commands.set(command.name, command); // Collection.set(), just sets key and value
}

// eventhandler for bot ready state
client.on('ready', () => {
    console.log(`Kirbot logged in! Tag: ${client.user.tag}`);
    
    client.user.setPresence({ activities: [{ name: 'with discord.js' }], status: 'idle' });
});

// eventhandler on receiving a message
client.on('messageCreate', async (msg) => {
    var text = msg.content; // this variable is the actual content of the message sent
    var sender = msg.author; // this is the sender of the message

    if (!text.startsWith(prefix) || sender.bot || msg.channel.type === 'dm' || msg.content === prefix) return; // returns if message doesn't start with prefix or if message is from a bot, or if message is in dm, or if message is only prefix

    // anything past here only executes if the above if statement resolves
    const args = text.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // if name isn't found, Collection.find a command that has aliases and is equal to the commandName
    
    if (!command) return msg.channel.send(`${msg.author}, I'm not sure what \"${commandName}\" means...`); // command not found


    if (command.args && !args.length) {
        return msg.channel.send(`${sender}, that command is missing info.`);
    }
    
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

	    if (now < expirationTime) {
		    return;
	    }
    }
    
    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    try {
        command.exec(msg, args); //can pass client to command if needed
    } catch (error) {
        console.error(error);
        msg.channel.send('there was an error somewhere.'); // report error in chat
    }
});

(async () => {client.login(token);})(); // connect bot to discord