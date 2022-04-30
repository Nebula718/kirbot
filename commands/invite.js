/* 
/   KirBot invite.js
/   
/   only sends a message with the bot invite in it.
/
/   the bot invite link was added to util.json. (jk i got rid of that file)
/
/   
*/
const Discord = require('discord.js');
const inviteURL = 'https://discord.com/api/oauth2/authorize?client_id=956708570462822421&permissions=8&scope=bot';

module.exports = {
    name: "invite",
    aliases: ["generate", "createinvite"],
    description: "Generates a link for me to join your server",
    cooldown: 20,
    exec(message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Look:")
            .setDescription(`[Invite Me](${inviteURL})`);
        message.channel.send({embeds: [embed]});
    }
}