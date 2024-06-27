const getRoleList = require("../../utils/getRoleList");
const sendMsg = require("../../utils/sendMsg");

module.exports = {
    name: 'roles',
    description: 'Assign yourself roles',
    deleted: false,

    callback: async (client, interaction) => 
        {
            try 
            {
                let roleList = await getRoleList(client, interaction.guild.id);    
                if(roleList.length === 0)
                {
                    await sendMsg
                    (
                        interaction,
                        'There are no assignable roles on this server currently.',
                        '#FF0000',
                        10
                    );
                    return;
                }
    
                let msg = 'Roles:'
                roleList.forEach(roleName => {
                    const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
                    if(role) msg += `\n <@&${role.id}>`;
                    else msg += `\n ${roleName}`;
                });
    
                sendMsg
                (
                    interaction,
                    msg,
                    '#FFFFFF',
                    -1
                );
            }
            catch (error)
            {
                console.log(error);
                sendMsg
                (
                    interaction,
                    'Error: Failed to get role list. Try again later.',
                    '#FF0000',
                    10
                );
            }
        }
}