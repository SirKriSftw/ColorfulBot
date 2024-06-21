const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const sendMsg = require('../../utils/sendMsg');



// Regular expression for hex color code validation
const hexColorRegex = /^#([0-9A-F]{6})$/i;

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

    callback: async (client, interaction) => {
        const colorCode = interaction.options.getString('color-code').toUpperCase();

        if (!hexColorRegex.test(colorCode))
        {
            return sendMsg(
                interaction, 
                'Error: Please use #RRGGBB hex format',
                '#FF0000');
        }

        let role = interaction.guild.roles.cache.find(role => role.name.toUpperCase() === colorCode);
        let existingColorRole = interaction.member.roles.cache.find(r => r.name.startsWith('#'));

        if(!role)
        {
            try
            {
                role = await interaction.guild.roles.create({
                    name: colorCode,
                    color: colorCode,
                    reason: `Created role for color ${colorCode}` 
                });

                interaction.member.roles.add(role);

                const msg = `Created and assigned role ${colorCode}.`
                sendMsg(
                    interaction, 
                    msg, 
                    '#00FF00');

                handleExistingColor(interaction, existingColorRole);
            }
            catch (error)
            {
                console.log(error)
            }
        }
        else
        {
            interaction.member.roles.add(role);

            const msg = `Assigned role ${colorCode}.`
                sendMsg(
                    interaction, 
                    msg, 
                    '#00FF00');

            handleExistingColor(interaction, existingColorRole);
        }
    }
};

async function handleExistingColor(interaction, existingColorRole) {
    if (existingColorRole)
    {
        try 
        {
            const membersCount = existingColorRole.members.size
            await interaction.member.roles.remove(existingColorRole, 'Replaced with new color');
            if (membersCount - 1 <= 0)
            {
                await existingColorRole.delete('Role is empty now');
                console.log(`Deleting Role ${existingColorRole.name}`);
            }
        }
        catch (error)
        {
            console.log(error);
        }
    }
}