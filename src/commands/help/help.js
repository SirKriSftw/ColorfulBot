const sendMsg = require("../../utils/sendMsg")

module.exports = {
    name: 'help',
    description: 'Get help for Colorful bot setup',

    callback: async (client, interaction) => {
        sendMsg(
            interaction,
            'To change your color just simply run /colorme #<your hex value here> OR <color name here>.\n' +
            'If you are a server admin and want to organize created colors just include a role that has \'color\' somewhere in it (case insensitive and ignores colorfulbot role)\n' +
            'If you wish for only CERTAIN users to be able to make hex colors include the following roles: \'color\' \'color end\' \'hexable\'.\n'+
            'color and color end roles can have characters inbetween but hexable must be exaclty hexable. Users assigned with hexable can use hex values for colors.',
            '#FFFFFF',
            -1);
    }
}
