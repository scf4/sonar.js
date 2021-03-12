import type WebSocket from 'ws';
import { Assets } from "./types/events";
interface State {
    ws: Maybe<WebSocket>;
    wsStatus: number;
    initialRoomId?: number;
    userId: number;
    moveId: number;
    room?: CurrentRoom;
    friends: Set<number>;
    friendRequests: Set<number>;
    rooms: Set<number>;
    cache: {
        assets: Assets;
        users: Map<number, any>;
        rooms: Map<number, any>;
    };
}
declare let getState: () => Readonly<State>;
declare let updateState: (callback: (state: State) => void) => Readonly<State>;
export { getState, updateState, };
