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

            if(colorList.client === 0)
            {
                sendMsg
                (
                    interaction,
                    'There are no colors on this server currently.',
                    '#FF0000',
                    10
                );
            }

            let msg = 'Colors:'
            colorList.forEach(color => {
                msg += `\n- ${color}`;
            });

            await sendMsg(
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