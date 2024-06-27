const pagination = require("../../utils/pagination");
const sendMsg = require("../../utils/sendMsg");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Get help for Colorful bot setup',

    callback: async (client, interaction) => 
    {
        let pages = [];
        for(let i = 0; i < 5; i++)
        {
            pages.push(
                new EmbedBuilder()
                .setColor('White')
                .setTitle(`Page ${i + 1}`)
                .setDescription(`This page ${i + 1}`)
            );
        }
        pagination(interaction, pages, 10);
    }
}
