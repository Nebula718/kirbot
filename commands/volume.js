/* 
/   KirBot volume.js
/   
/   sets the volume
/
/   
/
/   
*/
const Discord = require('discord.js');
const { Player } = require("discord-music-player");

module.exports = {
    name: "volume",
    aliases: ["setvolume"],
    description: "sets the volume of the player",
    cooldown: 0,
    args: 1,
    async exec(message, args) {
        const client = message.client;
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.setVolume(parseInt(args[0]));
    }
}