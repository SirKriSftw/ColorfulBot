const sendMsg = require("../../utils/sendMsg")

module.exports = {
    name: 'help',
    description: 'Get help for Colorful bot setup',

    callback: async (client, interaction) => {
        sendMsg(
            interaction,
            'To change your color just simply run /colorme #<your hex value here>.\n' +
            'If you are a server admin and want to organize created colors just include a role that has \'color\' somewhere in it (case insensitive and ignores colorfulbot role)',
            '#FFFFFF',
            -1);
    }
}
