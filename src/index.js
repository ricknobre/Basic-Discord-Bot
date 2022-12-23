import { Client, Partials } from 'discord.js'
import * as dotenv from 'dotenv';
import * as fs from 'fs'

dotenv.config()

const client = new Client({
    intents: [
        'Guilds',
        'GuildPresences',
        'GuildMessages',
        'GuildVoiceStates',
        'GuildMembers',
        'GuildBans',
        'MessageContent',
        'GuildMessageReactions',
        'AutoModerationExecution',
        'AutoModerationConfiguration',
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
    ]
})

client.login(process.env.TOKEN)


client.on('ready', (client) => {
    console.log('Bot online')
})
