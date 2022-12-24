import { CommandInteractionOptionResolver, InteractionType } from "discord.js";
import { client } from "../..";
import { ExtendedInteraction } from "../../Structs/Command";
import { Event } from "../../Structs/Event";

export default new Event('interactionCreate', (interaction) => {
    if (interaction.type === (InteractionType.ApplicationCommand)){

        const command = client.Commands.get(interaction.commandName)

        if (!command) return interaction.reply({ephemeral: true, content: 'Este comando ainda não foi configurado!'});

        const CommandInteraction = interaction as ExtendedInteraction;
        const Options = interaction.options as CommandInteractionOptionResolver

        command.run(client, CommandInteraction, Options)
    }
})