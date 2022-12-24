import { ApplicationCommandDataResolvable, Client, Collection, Partials, ClientEvents, GatewayIntentBits } from 'discord.js';

import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config()

export class ExtendedClient extends Client {
    public Commands: Collection<string, string> = new Collection();
    public Buttons: Collection<string, string> = new Collection();
    public SelectMenus: Collection<string, string> = new Collection();
    public Modals: Collection<string, string> = new Collection();
    constructor(){
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildEmojisAndStickers,
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.ThreadMember,
                Partials.Reaction,
                Partials.User
            ]
        })
    }
    public start(){
        const token = process.env.botToken

        
        this.login(token)
    }
    public async registerCommands(){

    }
    public async registerModules(){
        
    }
}