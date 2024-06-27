const { ApplicationCommandOptionType } = require("discord.js");
const sendMsg = require("../../utils/sendMsg");
const getRoleList = require("../../utils/getRoleList");

module.exports = {
    name: 'roleme',
    description: 'Set user role',
    options: 
    [
        {
            name: 'role-name',
            description: 'The name of the role to add/remove from self',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    deleted: false,

    callback: async (client, interaction) => 
    {
        let roleList = await getRoleList(client, interaction.guild.id);
        const roleName = interaction.options.get('role-name').value.toLowerCase();

        if(roleList.includes(roleName)) setRole(interaction, roleName);
        else
        {
            const roleListToString = roleList.join(', ');
            sendMsg
            (
                interaction,
                `${roleName[0].toUpperCase() + roleName.slice(1)} is not a valid role.\nMust be one of the following: ${roleListToString}`,
                '#FF0000',
                10
            )
        }
    }
};

function setRole(interaction, roleName)
{
    try 
    {
        let role = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == roleName);
        if(!role) 
        {
            sendMsg
            (
                interaction,
                `Error finding ${roleName} role. Try again later`,
                '#FF0000',
                10
            );
        }
        else
        {
            if(isUsingRoleAble(interaction) && !hasRoleAble(interaction))
            {
                sendMsg
                (
                    interaction,
                    `You are not allowed to give yourself roles. Contact a server admin.`,
                    '#FF0000',
                    10
                );
            }
            else
            {
                let hasRoleAlready = interaction.member.roles.cache.find(r => r.name == role.name);
                if(hasRoleAlready)
                {
                    interaction.member.roles.remove(role);
                    sendMsg
                    (
                        interaction,
                        `Removed <@&${role.id}> successfully.`,
                        '#FF9900',
                        10
                    );
                }
                else
                {
                    interaction.member.roles.add(role);
                    sendMsg
                    (
                        interaction,
                        `Add <@&${role.id}> successfully.`,
                        '#00FF00',
                        10
                    );
                }
            }
        }
    } 
    catch (error) 
    {
        sendMsg
        (
            interaction,
            `Error running command. Try again later`,
            '#FF0000',
            10
        );
    }
}

function isUsingRoleAble(interaction)
{
    let roleAble = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'role-able');
    if(roleAble) return true;
    return false;
}

function hasRoleAble(interaction)
{
    let canRole = interaction.member.roles.cache.find(role => role.name.toLowerCase() === 'role-able');
    if(canRole) return true;
    return false;
}