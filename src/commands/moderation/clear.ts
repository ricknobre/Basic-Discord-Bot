import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, AutoModerationActionType, ButtonBuilder, ButtonStyle, ChannelType, ColorResolvable, ComponentType, EmbedBuilder, Guild, GuildMember, Message, MessageFlags, ModalBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, TextChannel, TextInputBuilder, VoiceChannel } from "discord.js";
import { Command } from "../../Structs/Command";

import { setTimeout } from "node:timers/promises";
const wait = setTimeout;

export default new Command({
    name: 'limpar',
    description: 'Excluir mensagens do chat',
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    options: [
        {
            name: 'quantidade',
            description: 'especifique a quantidade de mensagens que serão deletadas (máximo 100 por vez)',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    async run(client, interaction, options) {
        
        const amount = options.getNumber('quantidade')!
        const { channel } = interaction
        
        if (channel instanceof TextChannel) channel.bulkDelete(amount, true)
        .then(deletedMessages => {

            const { size } = deletedMessages;
            
            interaction.reply({
                ephemeral: true, 
                content: `${size < 2 ? `Uma mensagem foi deletada` : `Foram deletadas ${size} mensagens`}`
            })
        })
    },
})