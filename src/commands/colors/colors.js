const getColorList = require("../../utils/getColorList");
const sendMsg = require("../../utils/sendMsg");

module.exports = {
   name: 'colors',
   description: 'A list of all available colors on this server',

   callback: async (client, interaction) => 
    {
        try 
        {
            let colorList = await getColorList(client, interaction.guild.id)

            if(colorList.length === 0)
            {
                await sendMsg
                (
                    interaction,
                    'There are no colors on this server currently.',
                    '#FF0000',
                    10
                );
                return;
            }

            let msg = 'Colors:'
            colorList.forEach(color => {
                const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === color.toLowerCase());
                if(role) msg += `\n <@&${role.id}>`;
                else msg += `\n ${color}`;
                
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
                'Error: Failed to get color list. Try again later.',
                '#FF0000',
                10
            );
        }
    }
}