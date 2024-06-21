const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');


module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try
    {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if (!commandObject) return;

        if (commandObject.devOnly)
        {
            if(!devs.includes(interaction.member.id))
            {
                interaction.reply({
                    content: 'Only developers can run this command.',
                    ephemeral: true
                })
                return;
            }
        }

        if (commandObject.testOnly)
        {
            if(!interaction.guild.id === testServer)
            {
                interaction.reply({
                    content: 'Only the test server can run this command.',
                    ephemeral: true
                })
                return;
            }
        }

        if (commandObject.permissionsRequired?.length)
        {
            for (const permission of commandObject.permissionsRequired)
            {
                if(!interaction.member.permissions.has(permission))
                {
                    interaction.reply({
                        content: 'Not enough permissions to run command.',
                        ephemeral: true
                    })
                }
                break;
            }
        }

        await commandObject.callback(client, interaction);

    }
    catch (error)
    {
        console.log(error);
    }
};