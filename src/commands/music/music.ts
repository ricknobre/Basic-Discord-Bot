import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, AutoModerationActionType, ButtonBuilder, ButtonStyle, ChannelType, ColorResolvable, ComponentType, EmbedBuilder, Guild, GuildMember, Message, MessageFlags, ModalBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, TextChannel, TextInputBuilder, VoiceChannel } from "discord.js";
import { Command } from "../../Structs/Command";

import { setTimeout } from "node:timers/promises";
const wait = setTimeout;

export default new Command({
    name: 'música',
    description: 'Comando de música',
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    options: [
        {
            name: 'tocar',
            description: 'adiciona uma música à fila de reprodução',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name:'nome',
                    description: 'nome da música ou URL',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'pular',
            description: 'pula itens da fila',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'quantidade',
                    description: 'especifique quantos itens deseja pular da fila',
                    type: ApplicationCommandOptionType.Number
                }
            ]
        },
        {
            name: 'pausar',
            description: 'pausa a reprodução atual',
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: 'remover',
            description: 'remove itens da lista de reprodução',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'quantidade',
                    description: 'especifique quantos itens deseja remover da fila',
                    type: ApplicationCommandOptionType.Number
                }
            ]
        }
    ],
    async run(client, interaction, options) {
        
    },
})