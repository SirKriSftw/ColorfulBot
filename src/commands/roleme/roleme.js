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
        sendMsg
        (
            interaction,
            `Added ${interaction.options.get('role-name').value} role`,
            '#00FF00',
            10
        )

        let roleList = getRoleList(client, interaction.guild.id);
    }
}