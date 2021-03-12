import * as api from "./api/index";
interface ClientArgs {
    authToken: string;
    clientName: string;
    userId: number;
    roomId: number;
}
declare let createClient: (args?: Partial<ClientArgs> | undefined, createWebSocket?: boolean) => Promise<typeof api>;
export { createClient, };
