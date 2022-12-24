import { ActionRowBuilder, ApplicationCommandType, AutoModerationActionType, BaseGuildTextChannel, ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, ColorResolvable, ComponentType, EmbedBuilder, Guild, GuildMember, Message, MessageFlags, ModalBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, StringSelectMenuBuilder, TextInputBuilder, VoiceChannel } from "discord.js";
import { Command } from "../../Structs/Command";

import fs from 'fs';
import path from 'path';
import { ConfigFile } from "../../Structs/Config";

import { setTimeout } from "node:timers/promises";
const wait = setTimeout;

import configFile from '../../json/config.json'

const jsonPath = path.join(__dirname, '../../', 'json');
const config: ConfigFile = configFile;

export default new Command({
    name: 'setup',
    description: 'Configurar bot e servidor',
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    async run(client, interaction, options) {

        const guild = interaction.guild as Guild

        checkConfigFile(guild)

        const embed = new EmbedBuilder()
        .setTitle('⚙️ Configurações')
        .setDescription('Selecione abaixo o que deseja configurar')
        .setColor("DarkAqua")

        const mainRow = new ActionRowBuilder<StringSelectMenuBuilder>({
            components: [
                new StringSelectMenuBuilder({
                    customId: 'setup-main',
                    placeholder: 'Selecione',
                    options: [
                        {
                            label: 'Logs',
                            value: 'setup-config-channel-logs',
                            description: 'Configurar canal de logs',
                            //emoji: '',
                        },
                        {
                            label: 'Global',
                            value: 'setup-config-channel-global',
                            description: 'Configurar canal global',
                            //emoji: '',
                        },
                        {
                            label: 'Commands',
                            value: 'setup-config-channel-commands',
                            description: 'Configurar canal de comandos',
                            //emoji: '',
                        }
                    ],
                })
            ]
        })

        const msg = await interaction.reply({ephemeral: true, embeds: [embed], components: [mainRow], fetchReply: true})
        
        msg.createMessageComponentCollector({componentType: ComponentType.StringSelect }).on('collect', async (selectInteraction) => {

            const value = selectInteraction.values[0]

            const row = new ActionRowBuilder<ChannelSelectMenuBuilder>({
                components: [
                    new ChannelSelectMenuBuilder({
                        customId:'change',
                        channelTypes: [
                            ChannelType.GuildText
                        ],
                    })
                ]
            })

            switch (value) {
                case 'setup-config-channel-logs': {
                    embed.setDescription(`Selecione o chat que deseja definir como chat de logs`)
                    row.components[0].setCustomId('setup-config-channel-logs')
                    selectInteraction.update({embeds: [embed], components: [row], fetchReply: true})
                    break;
                }
                case 'setup-config-channel-global': {
                    embed.setDescription(`Selecione o chat que deseja definir como chat global`)
                    row.components[0].setCustomId('setup-config-channel-global')
                    selectInteraction.update({embeds: [embed], components: [row], fetchReply: true})
                    break;
                }
                case 'setup-config-channel-commands': {
                    embed.setDescription(`Selecione o chat que deseja definir como chat de comandos`)
                    row.components[0].setCustomId('setup-config-channel-commands')
                    selectInteraction.update({embeds: [embed], components: [row], fetchReply: true})
                    break;
                }
            }
        })

        msg.createMessageComponentCollector({componentType: ComponentType.ChannelSelect}).on('collect', async (selectInteraction) => {
            const customID = selectInteraction.customId;
            const channel = guild.channels.cache.get(selectInteraction.values[0])

            switch (customID) {
                case 'setup-config-channel-logs': {

                    embed.setDescription(`Você definiu o chat ${channel} como novo chat de logs`)
                    selectInteraction.update({embeds: [embed], components: []})

                    config.guilds.find(g => g.id == guild.id)!.channels.logs = guild.id
                    
                    break;
                }
                case 'setup-config-channel-global': {
                    embed.setDescription(`Você definiu o chat ${channel} como novo chat global`)
                    selectInteraction.update({embeds: [embed], components: []})
    
                    config.guilds.find(g => g.id == guild.id)!.channels.global = guild.id
                    
                    break;
                }
                case 'setup-config-channel-commands': {
                    embed.setDescription(`Você definiu o chat ${channel} como novo chat de comandos`)
                    selectInteraction.update({embeds: [embed], components: []})
    
                    config.guilds.find(g => g.id == guild.id)!.channels.commands = guild.id

                    break;
                }
            }

            fs.writeFileSync(`${jsonPath}/config.json`, JSON.stringify(config))
        })
    },
})

async function checkConfigFile(guild: Guild){
    
    if (!config.guilds.find(g => g.id == guild.id)) {
        config.guilds.push({
            id: guild.id,
            channels: {
                commands: '',
                global: '',
                logs: ''
            }
        })

        fs.writeFileSync(`${jsonPath}/config.json`, JSON.stringify(config))
        
    }

}