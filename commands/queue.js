/* 
/   KirBot queue.js
/   
/   displays the current queue
/
/   
/
/   
*/
const Discord = require('discord.js');
const { Player } = require("discord-music-player");

module.exports = {
    name: "queue",
    aliases: ['getqueue'],
    description: "displays the queue",
    cooldown: 20,
    async exec(message, args) {
        const client = message.client;
        let guildQueue = client.player.getQueue(message.guild.id);
        message.channel.send(`current queue: \n${guildQueue.songs.join("\n")}`);
    }
}