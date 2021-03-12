import { updateState } from 'lib/state';
import * as actions from "./actions";
declare type Params = {
    roomId?: number;
    joinSilently?: boolean;
    viewportWidth?: number;
    viewportHeight?: number;
};
declare let createWebSocket: (args?: Params) => Promise<{
    actions: typeof actions;
}>;
export { createWebSocket, actions, updateState };
