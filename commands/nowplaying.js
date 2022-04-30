/* 
/   KirBot nowplaying.js
/   
/   show's what's currently playing
/
/   
/
/   
*/
const Discord = require('discord.js');
const { Player } = require("discord-music-player");

module.exports = {
    name: "nowplaying",
    description: "Returns the current track",
    aliases: ["song"],
    cooldown: 20,
    async exec(message, args) {
        const client = message.client;
        let guildQueue = client.player.getQueue(message.guild.id);
        message.channel.send(`Now playing: ${guildQueue.nowPlaying}`);
    }
}