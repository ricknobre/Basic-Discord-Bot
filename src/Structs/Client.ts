import { ApplicationCommandDataResolvable, Client, Collection, Partials, ClientEvents, GatewayIntentBits, ComponentType } from 'discord.js';
import { CommandType } from './Command';

import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import { Event } from './Event';
dotenv.config()

export class ExtendedClient extends Client {
    public Commands: Collection<string, CommandType> = new Collection();
    public Buttons: Collection<string, CommandType> = new Collection();
    public SelectMenus: Collection<string, CommandType> = new Collection();
    public Modals: Collection<string, CommandType> = new Collection();
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
        const token = process.env.botToken;

        this.registerModules()
        this.login(token);
    }
    public async registerCommands(commands: ApplicationCommandDataResolvable[]){
        this.application?.commands.set(commands)
        .then(() => console.log(`✅ Comandos Slash (/) definidos`))
        .catch((err) => console.log(`❌ Ocorreu um erro ao tentar definir os Comandos Slash (/)\n`, err))
    }
    public async registerModules(){

        const SlashCommands: ApplicationCommandDataResolvable[] = [];

        const commandPath = path.join(__dirname, '..', 'commands');
        fs.readdirSync(commandPath).forEach(local => {
            
            fs.readdirSync(`${commandPath}/${local}/`)
            .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
            .forEach(async (filename) => {
                
                const command: CommandType = (await import(`../commands/${local}/${filename}`))?.default
                
                if (!command.name) return;
                
                this.Commands.set(command.name, command)
                SlashCommands.push(command)

                if (command.components) command.components.forEach(component => {
                    if (component.type == ComponentType.Button) this.Buttons.set(component.customID, command)
                    if (component.type == ComponentType.StringSelect) this.SelectMenus.set(component.customID, command)
                })
                
                if (command.modals) command.modals.forEach(modal => {
                    if (modal.customID) this.Modals.set(modal.customID, command)
                })
            })
        })
        this.on('ready', () => this.registerCommands(SlashCommands));

        const eventPath = path.join(__dirname, '..', 'events');
        fs.readdirSync(eventPath).forEach(local => {
            fs.readdirSync(`${eventPath}/${local}/`)
            .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
            .forEach(async (filename) => {
                const {event, run}: Event<keyof ClientEvents> = (await import(`../events/${local}/${filename}`))?.default;
                try {
                    this.on(event, run);
                } catch (error) {
                    console.error(`Ocorreu um erro no evento ${event}\n`, error);
                }

            });
        })
    }
}