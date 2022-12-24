import { client } from "../..";
import { Event } from "../../Structs/Event";
import { color } from 'terminal-color';

export default new Event('ready', () => {
    console.log(color.fg.green(`✅ Bot online`));
    console.log(color.fg.cyan(`⤷ ⌨️  Comandos (/) carregados: ${client.Commands.size || color.fg.red('nenhum')}`));
    console.log(color.fg.cyan(`⤷ ⏺️  Botões carregados: ${client.Buttons.size || color.fg.red('nenhum')}`));
    console.log(color.fg.cyan(`⤷ 🗃️  Menus de seleção carregados: ${client.SelectMenus.size || color.fg.red('nenhum')}`));
    console.log(color.fg.cyan(`⤷ 📑  Modais carregados: ${client.Modals.size || color.fg.red('nenhum')}`));
})