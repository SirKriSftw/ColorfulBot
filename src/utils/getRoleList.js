module.exports = async (client, guildId) => {
    const guild = await client.guilds.fetch(guildId);
    let roleStart = guild.roles.cache.find(role => role.name.toUpperCase().includes('ROLES'));
    let roleEnd = guild.roles.cache.find(role => role.name.toUpperCase().includes('ROLES')  && role.name.toUpperCase().includes('END'));
    let roleList = [];

    if(roleStart && roleEnd)
    {
        roleList = guild.roles.cache
            .filter(r => r.position < roleStart.position && r.position > roleEnd.position)
            .map(r => r.name.toLowerCase());
            
        console.log(roleList);
    }
    return roleList;    
}