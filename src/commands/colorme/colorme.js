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
        let colorMeRole = interaction.guild.roles.cache.find(role => role.name.toUpperCase().includes('COLOR') && role.name.toUpperCase() != "COLORFULBOT");
        const colorCode = interaction.options.getString('color-code').toUpperCase();

        if(isUsingHexable(interaction))
        {
            colorMeName(interaction, colorCode)
        }
        else
        {
            colorMeHex(interaction, colorCode)
        }


        // if(!role)
        // {
        //     console.log('Brand new role')
        //     try
        //     {
        //         role = await interaction.guild.roles.create({
        //             name: colorCode,
        //             color: colorCode,
        //             position: position,
        //             reason: `Created role for color ${colorCode}` 
        //         });

        //         interaction.member.roles.add(role);

        //         const msg = `Created and assigned role ${colorCode}.`
        //         sendMsg(
        //             interaction, 
        //             msg, 
        //             '#00FF00');

        //         handleExistingColor(interaction, existingColorRole);
        //     }
        //     catch (error)
        //     {
        //         console.log(error)
        //     }
        // }
        // else
        // {
        //     interaction.member.roles.add(role);

        //     if(existingColorRole)
        //     {
        //         if(existingColorRole.name === colorCode)
        //         {
        //             handleSameColor(interaction, existingColorRole, colorCode);
        //         }
        //         else
        //         {
        //             const msg = `Assigned role ${colorCode}.`
        //             sendMsg(
        //                 interaction, 
        //                 msg, 
        //                 '#00FF00');

        //             handleExistingColor(interaction, existingColorRole);
        //         }
        //     }
            
        // }
    }
};

function colorMeName(interaction, colorCode)
{
    let colorList = getColorList(interaction);
    const colorListToString = colorList.join(', ');
    if(!colorCode.includes('#'))
    {
        if(!colorList.includes(colorCode.toLowerCase()))
        {
            
            return sendMsg(
                interaction, 
                `Error: Please use one of the following: ${colorListToString}`,
                '#FF0000');
        }
        else
        {
            setColor(interaction, colorCode, colorList);
        }
    }
    else if(!canUseHex(interaction))
    {
        return sendMsg(
            interaction, 
            `Error: You cannot use hex values use one of the following: ${colorListToString}`,
            '#FF0000');
    }
    else
    {

    }
}

function colorMeHex(interaction, colorCode)
{    
    if(!hexColorRegex.test(colorCode))
    {
        return sendMsg(
            interaction, 
            'Error: Please use #RRGGBB hex format',
            '#FF0000');
    }
    else
    {

    }
}

async function setColor(interaction, colorCode, colorList)
{
    let existingColorRole = interaction.member.roles.cache.find(r => colorList.includes(r.name.toLowerCase()));
    let role = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == colorCode.toLowerCase());
    try 
    {
        if(existingColorRole === role)
        {
            interaction.member.roles.remove(role, 'User asked to remove role');

            const msg = `Removed role ${colorCode.toLowerCase()}.`
            sendMsg(
                interaction, 
                msg, 
                '#FF0000');
        }
        else
        {
            interaction.member.roles.add(role);
            if(existingColorRole)
            {
                await interaction.member.roles.remove(existingColorRole, 'Replaced with new color');
            }

            const msg = `Assigned role ${colorCode.toLowerCase()}.`
            sendMsg(
                interaction, 
                msg, 
                '#00FF00');
        }
    }
    catch (error)
    {
        console.log(error);
    }
}

async function setColorHex(interaction, colorCode)
{

}

function isUsingHexable(interaction)
{
    let hexable = interaction.guild.roles.cache.find(role => role.name.toLowerCase().includes('hexable'));
    if(hexable) return true;
    return false;
}

function canUseHex(interaction)
{
    let canHex = interaction.member.roles.cache.find(role => role.name.toLowerCase() === "hexable");
    if(canHex) return true;
    return false;
}

function getColorList(interaction)
{
    let colorMeRole = interaction.guild.roles.cache.find(role => role.name.toUpperCase().includes('COLOR') && role.name.toUpperCase() != "COLORFULBOT");
    let colorMeRoleEnd = interaction.guild.roles.cache.find(role => role.name.toUpperCase().includes('COLOR')  && role.name.toUpperCase().includes('END'));
    let colorList = [];

    if(colorMeRole && colorMeRoleEnd)
    {
        colorList = interaction.guild.roles.cache
            .filter(r => r.position < colorMeRole.position && r.position > colorMeRoleEnd.position && !r.name.includes('#'))
            .map(r => r.name.toLowerCase());
            
        console.log(colorList);
    }

    return colorList;
}

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