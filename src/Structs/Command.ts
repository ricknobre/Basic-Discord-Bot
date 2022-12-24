import { ComponentType, ButtonInteraction, StringSelectMenuInteraction, ModalSubmitInteraction, CommandInteraction, ContextMenuCommandInteraction, CommandInteractionOptionResolver, ApplicationCommandData, GuildMember } from 'discord.js'
import { ExtendedClient } from './Client';

interface CommandComponent {
    customID: string;
    type: ComponentType.Button | ComponentType.StringSelect;
    execute: (interaction: ButtonInteraction | StringSelectMenuInteraction) => any;
}

interface CommandModal {
    customID: string;
    execute: (interaction: ModalSubmitInteraction) => any;
}

type RunFunction = (
    client: ExtendedClient,
    interaction: CommandInteraction | ContextMenuCommandInteraction,
    options: CommandInteractionOptionResolver
) => any;

export type CommandType = ApplicationCommandData & {
    run: RunFunction;
    components?: CommandComponent[];
    modals?: CommandModal[];
}

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

export class Command {
    constructor(commandOptions: CommandType){
        Object.assign(this, commandOptions)
    }
}