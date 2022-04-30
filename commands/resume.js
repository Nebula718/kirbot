/* 
/   KirBot resume.js
/   
/   resume music
/
/   
/
/   
*/
const Discord = require('discord.js');
const { Player } = require("discord-music-player");

module.exports = {
    name: "resume",
    description: "Resume the queue",
    cooldown: 20,
    async exec(message, args) {
        const client = message.client;
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.setPaused(false);
    }
}