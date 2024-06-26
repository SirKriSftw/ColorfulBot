const { ApplicationCommandOptionType } = require('discord.js');
const sendMsg = require('../../utils/sendMsg');

// Regular expression for hex color code validation
const hexColorRegex = /^#([0-9A-F]{6})$/i;

module.exports = {
    name: 'colorme',
    description: 'Set user name color',
    options: [
        {
            name: 'color-code',
            description: 'Color Name or Hex to change to (Ability to use hex is controlled by server admins)',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    deleted: false,
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

        let colorMeRole = interaction.guild.roles.cache.find(role => role.name.toUpperCase().includes('COLOR') && role.name.toUpperCase() != "COLORFULBOT");
        let position = colorMeRole ? colorMeRole.position : interaction.guild.roles.size;
        
        if(!role)
        {
            console.log('Brand new role')
            try
            {
                role = await interaction.guild.roles.create({
                    name: colorCode,
                    color: colorCode,
                    position: position,
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

            if(existingColorRole)
            {
                console.log(existingColorRole.color + " " + colorCode)
                if(existingColorRole.name === colorCode)
                {
                    handleSameColor(interaction, existingColorRole, colorCode);
                }
                else
                {
                    const msg = `Assigned role ${colorCode}.`
                    sendMsg(
                        interaction, 
                        msg, 
                        '#00FF00');

                    handleExistingColor(interaction, existingColorRole);
                }
            }
            
        }
    }
};

async function handleSameColor(interaction, existingColorRole, colorCode) {
    if(existingColorRole) 
    {
        if(existingColorRole.name === colorCode)
        {
            try 
            {
                const membersCount = existingColorRole.members.size
                await interaction.member.roles.remove(existingColorRole, 'Removing color');
                const msg = `Removed ${colorCode}.`

                if (membersCount - 1 <= 0)
                {
                    await existingColorRole.delete('Role is empty now');
                    console.log(`Deleting Role ${existingColorRole.name}`);
                }

                return sendMsg(
                    interaction, 
                    msg, 
                    '#FF0000');
            }
            catch (error)
            {
                console.log(error);
            }
        }

    }
    return false;
}


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