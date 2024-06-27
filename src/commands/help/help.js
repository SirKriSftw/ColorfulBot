const pagination = require("../../utils/pagination");
const sendMsg = require("../../utils/sendMsg");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Get help for Colorful bot setup',

    callback: async (client, interaction) => 
    {
        let pages = [];

        const page1 = new EmbedBuilder()
        .setColor("#FFFFFF")
        .setTitle('How to use')
        .addFields(
            {
                name: '/colors and /roles',
                value: 'Use /colors or /roles to get a list of the availiable self-assign colors and roles there are.'
            },
            {
                name: '/roleme',
                value: 'Do /roleme <role name> to assign yourself that role. If you run it on a role you already have it will be removed.\n' + 
                'If the server uses permissions you must have \'role-able\' to use this command.'
            },
            {
                name: '/colorme',
                value: 'Do /colorme <color name> to assign yourself that color. If you run it on a color you already have it will be removed.\n' + 
                'If the server uses permissions you must have \'hexable\' to give yourself hex colors (can still use normal colors).\n' +
                'A user may only have 1 color at a time, so using /colorme will remove your old color automatically.\n'+
                'Any hex colors without users using it will automatically be removed.'
            }
        );

        const page2 = new EmbedBuilder()
        .setColor("#FFFFFF")
        .setTitle('How to setup')
        .setDescription(
            'To setup various features of the bot just run the command \'/setup\'.\n' +
            'It has 2 arguments, \'setup\' and \'permissions\'.\n' +
            'Setup argument determines which roles to setup, colors or roles.\n' +
            'Permissions IF set to true will add the permission role \'hexable\' or \'role-able\' depending on what roles are being setup.'
        );

        const page3 = new EmbedBuilder()
        .setColor("#FFFFFF")
        .setTitle('How to configure')
        .addFields(
            {
                name: 'For Colors',
                value: 'To add more colors to color list simply add roles inbetween roles that include the words \'COLOR\' and \'COLOR END\' where COLOR END is below the COLOR role. (Colorful bot role is ignored)'
            },
            {
                name: 'For Roles',
                value: 'To add more roles to role list simply add roles inbetween roles that include the words \'ROLES\' and \'ROLES END\' where ROLES END is below the ROLE role.'
            },
            {
                name: 'For Permissions',
                value: 'To give a member the ability to self-assign HEX colors, give them the role \'hexable\'. To give a member the ability to self-assign roles from role list give them the role \'role-able\'.\n' +
                'IF \'hexable\' role does NOT exist, any user may use hex colors.\n' +
                'IF \'role-able\' role does NOT exist, any user can self assign roles from role list.'
            }
        );

        pages.push(page1);
        pages.push(page2);
        pages.push(page3);
        pagination(interaction, pages, 60);
    }
}
