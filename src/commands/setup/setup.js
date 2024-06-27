const { ApplicationCommandOptionType } = require("discord.js");

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
    callback: async (client, interation) => {
        console.log(interation.options)
    }
}