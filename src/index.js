require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages
    ]
});

client.login(process.env.DISCORD_TOKEN);

client.on('ready', (c) => {
    console.log(`✅ ${c.user.username} is online!`);
})