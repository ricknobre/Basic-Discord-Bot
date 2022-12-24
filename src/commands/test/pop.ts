import { ActionRowBuilder, ApplicationCommandType, AutoModerationActionType, ButtonBuilder, ButtonStyle, ChannelType, ColorResolvable, ComponentType, EmbedBuilder, Guild, GuildMember, Message, MessageFlags, ModalBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, TextInputBuilder, VoiceChannel } from "discord.js";
import { Command } from "../../Structs/Command";

import { setTimeout } from "node:timers/promises";
const wait = setTimeout;

export default new Command({
    name: 'pop',
    description: 'Comando de test',
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    async run(client, interaction, options) {
        
        interaction.reply({ephemeral: true, content: 'test'})
    },
})