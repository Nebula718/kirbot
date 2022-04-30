/* 
/   KirBot clear.js
/   
/   clear the queue
/
/   
/
/   
*/
const Discord = require('discord.js');
const { Player } = require("discord-music-player");

module.exports = {
    name: "clear",
    description: "Clears the queue",
    cooldown: 20,
    async exec(message, args) {
        const client = message.client;
        let guildQueue = client.player.getQueue(message.guild.id);
        quildQueue.clearQueue();
    }
}