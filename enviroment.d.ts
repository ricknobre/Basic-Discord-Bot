declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            clientID: string;
            guildID: string;
        }
    }
}

export {};