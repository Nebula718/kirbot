/* 
/   KirBot stop.js
/   
/   stop music
/
/   
/
/   
*/
const Discord = require('discord.js');
const { Player } = require("discord-music-player");

module.exports = {
    name: "stop",
    description: "Stop whatever's playing",
    cooldown: 20,
    async exec(message, args) {
        const client = message.client;
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.stop();
    }
}