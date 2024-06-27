module.exports = async (client, guildId) => {
    const guild = await client.guilds.fetch(guildId);
    let colorMeRole = guild.roles.cache.find(role => role.name.toUpperCase().includes('COLOR') && role.name.toUpperCase() != "COLORFULBOT");
    let colorMeRoleEnd = guild.roles.cache.find(role => role.name.toUpperCase().includes('COLOR')  && role.name.toUpperCase().includes('END'));
    let colorList = [];

    if(colorMeRole && colorMeRoleEnd)
    {
        colorList = guild.roles.cache
            .filter(r => r.position < colorMeRole.position && r.position > colorMeRoleEnd.position && !r.name.includes('#'))
            .map(r => r.name.toLowerCase());
    }
    return colorList;    
}