import { EmbedBuilder, GuildTextBasedChannel } from "discord.js";
import { ConfigFile } from "../../Structs/Config";
import { Event } from "../../Structs/Event";

import configFile from '../../json/config.json'
const config: ConfigFile = configFile;

export default new Event('guildMemberAdd', async (member) => {
    
    const guild = member.guild;

    const guildConfig = config.guilds.find(g => g.id == guild.id)
    if (!guildConfig || !guildConfig.channels.global) return;

    const cGlobal = guild.channels.cache.find(c => c.id == guildConfig.channels.global) as GuildTextBasedChannel
    if (!cGlobal) return;

    const embed = new EmbedBuilder()
    .setDescription(`${member} entrou no servidor`)
    .setColor('Green')
    .setThumbnail(member.displayAvatarURL())
    .setTimestamp()

    cGlobal.send({embeds: [embed]})
})