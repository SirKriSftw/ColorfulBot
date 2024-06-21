const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');



// Regular expression for hex color code validation
const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;

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
        const colorCode = interaction.options.getString('color-code');

        if (!hexColorRegex.test(colorCode))
        {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('Error: Invalid hex color code format. Please use #RRGGBB');

            return interaction.reply(
                {
                    embeds: [embed],
                    ephemeral: true
                }                
            );
        }
    }
}