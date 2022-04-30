/* 
/   KirBot pause.js
/   
/   pause music
/
/   
/
/   
*/
const Discord = require('discord.js');
const { Player } = require("discord-music-player");

module.exports = {
    name: "pause",
    description: "Pause whatever's playing",
    cooldown: 20,
    async exec(message, args) {
        const client = message.client;
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.setPaused(true);
        message.channel.send('Pausing queue.')
    }
}