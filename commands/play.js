/* 
/   KirBot play.js
/   
/   plays music in a voice channel
/
/   
/
/   
*/
const Discord = require('discord.js');
const { Player } = require("discord-music-player");

module.exports = {
    name: "play",
    description: "Plays a song in a voice channel",
    cooldown: 0,
    async exec(message, args) {
        const client = message.client;
        let guildQueue = client.player.getQueue(message.guild.id);
        if(!args.length){ // if no args
            if (guildQueue.paused) // resume if queue is paused
                guildQueue.setPaused(false);
            else
                message.channel.send(`${message.author}, you need to specify music to play.`);
        }
        else{ // start and/or add to queue and play
            let queue = client.player.createQueue(message.guild.id);
            await queue.join(message.member.voice.channel);
            let song = await queue.play(args.join(' ')).catch(_ => { // uses args as search query to find song
                if(!guildQueue)
                    queue.stop(); // stops trying to play when queue is empty
            });
            message.channel.send(`Added to queue: ${song.name}`);
        }
    }
}