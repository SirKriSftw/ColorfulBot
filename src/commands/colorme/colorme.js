const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'colorme',
    description: 'Set user name color',
    options: [
        {
            name: 'color-code',
            description: 'Hex color code to change to',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],

    callback: (client, interaction) => {
        interaction.reply('Test!')
    }
}