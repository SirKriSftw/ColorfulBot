const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const sendMsg = require("../../utils/sendMsg");

module.exports = {
    name: 'setup',
    description: 'Setup roles for controlling cmd colors/roles',
    options: 
    [
        {
            name: 'setup',
            description: 'Do you want to setup roles or colors?',
            required: true,
            type: ApplicationCommandOptionType.String,
            permissions: [PermissionsBitField.Flags.ManageRoles],
            choices: 
            [
                {
                    name: 'colors',
                    value: 'colors'
                },
                {
                    name: 'roles',
                    value: 'roles'
                }
            ]
        },
        {
            name: 'permissions',
            description: 'Do users need permission to run cmd?',
            type: ApplicationCommandOptionType.Boolean,
            choices: 
            [
                {
                    name: 'true',
                    value: 'true'
                },
                {
                    name: 'false',
                    value: 'false'
                }
            ]
        }
    ],
    deleted: false,
    callback: async (client, interaction) => {
        const rolesToSetup = interaction.options.get('setup').value;
        const hasPermissions = interaction.options.get('permissions');
        
        if(!rolesToSetup) return;
        if(rolesToSetup === 'colors')
        {
            setupColors(interaction, hasPermissions);
        }
        else
        {
            setupRoles(interaction, hasPermissions);
        }
    }
};

async function setupColors(interaction, permissions)
{
    try 
    {
        const guild = interaction.guild;
        let colorMeRole = guild.roles.cache.find(role => role.name.toUpperCase().includes('COLOR') && role.name.toUpperCase() != "COLORFULBOT");
        let colorMeRoleEnd = guild.roles.cache.find(role => role.name.toUpperCase().includes('COLOR')  && role.name.toUpperCase().includes('END'));
        let hexable = guild.roles.cache.find(role => role.name.toLowerCase().includes('hexable'));

        let msg = ``;
        let firstTime = false;

        if(!colorMeRole && !colorMeRoleEnd) firstTime = true;
        if(permissions && !hexable)
        {
            hexable = await guild.roles.create({
                name: "hexable",
                position: 0,
                reason: `Created role for allowing users to change to a hex color.` 
            });
            msg += `Added <@&${hexable.id}>. You can CANNOT edit the name. Give it to users who are allowed to use and create hex colors.\n`;
        }
        if(!colorMeRole)
        {
            colorMeRole = await guild.roles.create({
                name: "===COLORS===",
                position: 0,
                reason: `Created role for organizing colors` 
            });
            msg += `Added <@&${colorMeRole.id}>. You can edit the name, it just must include the word \'color\' in it.\n`;
        }
        if(!colorMeRoleEnd)
        {
            colorMeRoleEnd = await guild.roles.create({
                name: "===COLORS END===",
                position: 0,
                reason: `Created role for organizing colors` 
            });
            msg += `Added <@&${colorMeRoleEnd.id}>. You can edit the name, it just must include the words \'color\' and \'end\' in it.\n`;
        }
        if(firstTime)
        {
            let red = guild.roles.cache.find(role => role.name.toLowerCase() === 'red');
            if(red)
            {
                red.position = colorMeRole.position;
                msg += `Moved existing <@&${red.id}> role into the color list. Here is where you place all colors you want a user to be able to use.\n`;
            } 
            else
            {
                red = await guild.roles.create({
                    name: "red",
                    color: "#FF0000",
                    position: colorMeRole.position,
                    reason: `Sample color` 
                });
                msg += `Added sample <@&${red.id}> role into the color list. Here is where you place all colors you want a user to be able to use.\n`;
            }
        }

        if(msg != "")
        {
            sendMsg
            (
                interaction,
                msg,
                '#FFFFFF',
                -1
            )
        }
        else
        {
            sendMsg
            (
                interaction,
                'Roles for colors already setup',
                '#FF0000',
                -1
            )
        }
    }
    catch (error)
    {
        console.log(error);
        sendMsg
        (
            interaction,
            'There was an error running the command. Try again later.',
            '#FF0000',
            10
        )
    }

}

async function setupRoles(interaction, permissions)
{
    try 
    {
        const guild = interaction.guild;
        let roleStart = guild.roles.cache.find(role => role.name.toUpperCase().includes('ROLE'));
        let roleEnd = guild.roles.cache.find(role => role.name.toUpperCase().includes('ROLE')  && role.name.toUpperCase().includes('END'));
        let roleAble = guild.roles.cache.find(role => role.name.toLowerCase().includes('role-able'));

        let msg = ``;
        let firstTime = false;

        if(!roleStart && !roleEnd) firstTime = true;
        if(permissions && !roleAble)
        {
            roleAble = await guild.roles.create({
                name: "role-able",
                position: 0,
                reason: `Created role for allowing users to add roles.` 
            });
            msg += `Added <@&${roleAble.id}>. You can CANNOT edit the name. Give it to users who are allowed to give themselves roles from role list.\n`;
        }
        if(!roleStart)
        {
            roleStart = await guild.roles.create({
                name: "===ROLES===",
                position: 0,
                reason: `Created role for organizing roles` 
            });
            msg += `Added <@&${roleStart.id}>. You can edit the name, it just must include the word \'roles\' in it.\n`;
        }
        if(!roleEnd)
        {
            roleEnd = await guild.roles.create({
                name: "===ROLES END===",
                position: 0,
                reason: `Created role for organizing colors` 
            });
            msg += `Added <@&${roleEnd.id}>. You can edit the name, it just must include the words \'roles\' and \'end\' in it.\n`;
        }
        if(firstTime)
        {
            let sample = guild.roles.cache.find(role => role.name.toLowerCase() === 'sample');
            if(sample)
            {
                sample.position = roleStart.position;
                msg += `Moved existing <@&${sample.id}> role into the role list. Here is where you place all roles you want a user to be able to use.\n`;
            } 
            else
            {
                sample = await guild.roles.create({
                    name: "sample",
                    position: roleStart.position,
                    reason: `Sample role` 
                });
                msg += `Added sample <@&${sample.id}> role into the role list. Here is where you place all roles you want a user to be able to use.\n`;
            }
        }

        if(msg != "")
        {
            sendMsg
            (
                interaction,
                msg,
                '#FFFFFF',
                -1
            )
        }
        else
        {
            sendMsg
            (
                interaction,
                'Roles for roleme already setup',
                '#FF0000',
                -1
            )
        }
    }
    catch (error)
    {
        console.log(error);
        sendMsg
        (
            interaction,
            'There was an error running the command. Try again later.',
            '#FF0000',
            10
        )
    }

}