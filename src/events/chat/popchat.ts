import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChannelType, ColorResolvable, ComponentType, EmbedBuilder, Guild, GuildMember, NewsChannel } from "discord.js";

import { setTimeout } from "node:timers/promises";
import { Event } from "../../Structs/Event";
const wait = setTimeout;

export default new Event('messageCreate', async message => {
    
})