/* 
/   KirBot skips.js
/   
/   skip track
/
/   
/
/   
*/
const Discord = require('discord.js');
const { Player } = require("discord-music-player");

module.exports = {
    name: "skip",
    description: "Skip the current track",
    cooldown: 20,
    async exec(message, args) {
        const client = message.client;
        let guildQueue = client.player.getQueue(message.guild.id);
        message.channel.send(`skipping track: ${guildQueue.nowPlaying}`);
        guildQueue.skip();
    }
}