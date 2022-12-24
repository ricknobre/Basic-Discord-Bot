export interface ConfigFile {
    guilds: Array<{
        id: string,
        channels:{
            logs: string,
            global: string,
            commands: string
        }
    }>
}