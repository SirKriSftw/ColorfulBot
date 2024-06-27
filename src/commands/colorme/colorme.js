const { ApplicationCommandOptionType } = require('discord.js');
const sendMsg = require('../../utils/sendMsg');
const getColorList = require('../../utils/getColorList');

// Regular expression for hex color code validation
const hexColorRegex = /^#([0-9A-F]{6})$/i;

const cooldowns = new Map();
const cooldownTimeSeconds = 10;

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
        if(await checkCooldown(interaction)) return;

        let colorList = await getColorList(client, interaction.guild.id);
        const colorCode = interaction.options.getString('color-code').toUpperCase();

        if(isUsingHexable(interaction))
        {
            colorMeName(interaction, colorCode, colorList);
        }
        else
        {
            colorMeHex(interaction, colorCode, colorList);
        }
    }
};

async function checkCooldown(interaction)
{
    try
    {
        if(!cooldowns.has(interaction.user.id))
        {
            cooldowns.set(interaction.user.id, new Date());
            return false;
        }
        else
        {
            const lastTime = cooldowns.get(interaction.user.id);
            const now = new Date();
            const diffTime = Math.abs(now - lastTime);
            const seconds = Math.ceil(diffTime / 1000);
    
            if(seconds <= cooldownTimeSeconds)
            {
                const remainingTime = cooldownTimeSeconds - seconds;
                await sendMsg
                (
                    interaction,
                    `Please wait ${remainingTime} more second(s) before using colorme command again`,
                    '#FF0000',
                    10
                )
                return true;
            }

            cooldowns.set(interaction.user.id, now);
            return false;
        }
    }
    catch (error)
    {
        console.log(error);
        await sendMsg
        (
            interaction,
            'Error: Failed to run colorme command. Try again later.',
            '#FF0000',
            10
        );

        return;
    }
}

function colorMeName(interaction, colorCode, colorList)
{
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
        colorMeHex(interaction, colorCode, colorList);
    }
}

function colorMeHex(interaction, colorCode, colorList)
{    
    if(!colorCode.includes('#'))
    {
        const colorListToString = colorList.join(', ');
        if(colorList.includes(colorCode.toLowerCase()))
        {
            setColor(interaction, colorCode, colorList);
        }
        else
        {
            return sendMsg(
                interaction, 
                `Error: Please use one of the following: ${colorListToString} OR #RRGGBB format`,
                '#FF0000');
        }
    }
    else if(!hexColorRegex.test(colorCode))
    {
        return sendMsg(
            interaction, 
            'Error: Please use #RRGGBB hex format',
            '#FF0000');
    }
    else
    {
        setColorHex(interaction, colorCode, colorList);
    }
}

async function setColor(interaction, colorCode, colorList)
{
    let existingColorRole = interaction.member.roles.cache.find(r => r.name.includes('#') || colorList.includes(r.name.toLowerCase()));
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

                const msg = `Assigned role ${colorCode.toLowerCase()}, and removed ${existingColorRole.name}`
                sendMsg(
                    interaction, 
                    msg, 
                    '#FF9900');
            }
            else
            {
                const msg = `Assigned role ${colorCode.toLowerCase()}.`
                sendMsg(
                    interaction, 
                    msg, 
                    '#00FF00');
            }

        }
    }
    catch (error)
    {
        console.log(error);
    }
}

async function setColorHex(interaction, colorCode, colorList)
{
    let existingColorRole = interaction.member.roles.cache.find(r => r.name.includes('#') || colorList.includes(r.name.toLowerCase()));
    let role = interaction.guild.roles.cache.find(r => r.name.toUpperCase() == colorCode.toUpperCase());

    if(role)
    {
        interaction.member.roles.add(role);

        if(existingColorRole)
        {
            if(existingColorRole.name === colorCode)
            {
                handleSameColor(interaction, existingColorRole, colorCode);
            }
            else
            {
                const msg = `Assigned role ${colorCode}, and removed ${existingColorRole.name}.`
                sendMsg(
                    interaction, 
                    msg, 
                    '#FF9900');

                handleExistingColor(interaction, existingColorRole);
            }
        }
        else
        {
            const msg = `Assigned role ${colorCode}`
            sendMsg(
                interaction, 
                msg, 
                '#00FF00');
        }
    }
    else
    {
        console.log('Brand new role');
        let colorMeRole = interaction.guild.roles.cache.find(role => role.name.toUpperCase().includes('COLOR') && role.name.toUpperCase() != "COLORFULBOT");
        let position = colorMeRole ? colorMeRole.position : interaction.guild.roles.size;

        try
        {
            let role = await interaction.guild.roles.create({
                name: colorCode.toUpperCase(),
                color: colorCode,
                position: position,
                reason: `Created role for color ${colorCode.toUpperCase()}` 
            });

            interaction.member.roles.add(role);

            const msg = `Created and assigned role ${colorCode.toUpperCase()}.`
            sendMsg(
                interaction, 
                msg, 
                '#00FF00');

            if(existingColorRole) handleExistingColor(interaction, existingColorRole);
        }
        catch (error)
        {
            console.log(error)
        }
    }
}

function isUsingHexable(interaction)
{
    let hexable = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'hexable');
    if(hexable) return true;
    return false;
}

function canUseHex(interaction)
{
    let canHex = interaction.member.roles.cache.find(role => role.name.toLowerCase() === "hexable");
    if(canHex) return true;
    return false;
}

async function handleSameColor(interaction, existingColorRole, colorCode) {
    if(existingColorRole.name.includes('#')) 
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
}

async function handleExistingColor(interaction, existingColorRole) {
    if (existingColorRole.name.includes('#'))
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
    else
    {
        await interaction.member.roles.remove(existingColorRole, 'Replaced with new color')
    }
}