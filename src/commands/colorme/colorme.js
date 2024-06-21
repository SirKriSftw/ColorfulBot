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

    callback: async (client, interaction) => {
        const colorCode = interaction.options.getString('color-code').toLowerCase();

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

        let role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === colorCode);
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
                interaction.reply({
                    content: `Created and assigned role ${colorCode}.`,
                    ephemeral: true
                });

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
            interaction.reply({
                content: `Assigned role ${colorCode}.`,
                ephemeral: true
            });

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
                console.log('Deleting Role');
            }
        }
        catch (error)
        {
            console.log(error);
        }
    }
}