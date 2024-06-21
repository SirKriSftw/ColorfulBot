const { EmbedBuilder } = require('discord.js');

module.exports = ( interaction, message, color = '#FFFFFF', delay = 10) => {

    const embed = new EmbedBuilder()
            .setColor(color)
            .setDescription(message);

        return interaction.reply(
            {
                embeds: [embed],
                ephemeral: true
            }                
        ).then((message) => {
            if (delay === -1) {
                return
            }

            setTimeout(() => {
                message.delete()
            }, 1000 * delay)
        });

}