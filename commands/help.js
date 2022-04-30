/* 
/   KirBot help command
/   
/   command key: help
/
/   This command dynamically builds an embed with descriptions of all commands.
/
/   
*/
const Discord = require('discord.js');
//const { prefix } = require('../util.json');

module.exports = {
    name: 'help',
    description: 'Displays this message, or explains a command',
    args: false,
    cooldown: 5,
    exec(message, args) {

        const { commands } = message.client;
        const embed = new Discord.MessageEmbed() //creates embed object to fill with command info
            .setTitle('Help');

        function display(c) { //defined function to list aliases if a command has any
            if (c.aliases) 
                return("Aliases: " +c.aliases.join(', '));
            else return "";
        }

        if (!args.length) { // no args, create default embed section
            
            commands.each(cmd =>
            {
                embed.addField(cmd.name + ":",
                    `${display(cmd)}\n
                    Description: ${cmd.description}`, false);
            });

            message.channel.send({embeds: [embed]});
            return;
        }

        //otherwise, find specific command from first arg
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

        if (!command) return message.channel.send('...no command.');
        embed.addField(name, `${display(command)} \n
        ${command.description}`, false);
        console.log('Running command help, command: ' + command.name);
        message.channel.send({embeds: [embed]});
    },
}