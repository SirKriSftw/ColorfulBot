const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = async (interaction, pages, timeout = 20, hidden = true) => {
    try 
    {
        if(!interaction || !pages) throw new  Error('Interaction or pages were not sent and are required.');
        if(!pages.length > 0) throw new Error('No pages were passed.');


        await interaction.deferReply({ephemeral: hidden});

        if(pages.length === 1)
        {
            return await interaction.editReply({ embeds: pages, components: [], fetchReply: true, ephemeral: hidden});
        }

        let index = 0;

        const prev = new ButtonBuilder()
        .setCustomId('prevPage')
        .setEmoji('◀')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(index === 0);

        const pageCount = new ButtonBuilder()
        .setCustomId('pageCount')
        .setLabel(`${index + 1}/${pages.length}`)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true);

        const next = new ButtonBuilder()
        .setCustomId('nextPage')
        .setEmoji('▶')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(index === pages.length - 1);

        const buttons = new ActionRowBuilder().addComponents([prev, pageCount, next]);

        const msg = await interaction.editReply({embeds: [pages[index]], components: [buttons], fetchReply: true});

        const collector = await msg.createMessageComponentCollector({
            componentType : ComponentType.Button,
            time: timeout * 1000
        });

        collector.on('collect', async i => {
            if(i.user.id !== interaction.user.id) return await i.reply({content: 'You are not allowed to use this button, only the user who ran the command can', ephemeral: true});

            await i.deferUpdate();

            if(i.customId === 'prevPage')
            {
                if(index > 0) index--;
                pageCount.setLabel(`${index + 1}/${pages.length}`);
            }
            else if(i.customId === 'nextPage')
            {
                if(index < pages.length - 1) index++;
                pageCount.setLabel(`${index + 1}/${pages.length}`);
            }

            (index === 0) ? prev.setDisabled(true) : prev.setDisabled(false);
            (index === pages.length - 1) ? next.setDisabled(true) : next.setDisabled(false);

            await interaction.editReply({ embeds: [pages[index]], components: [buttons]}).catch(err => {});
            collector.resetTimer();
        });

        collector.on('end', async () => {
            await interaction.editReply({embeds: [pages[index]], components: []}).catch(err => {});
        })
    }
    catch (error)
    {
        console.log(error);
    }
}