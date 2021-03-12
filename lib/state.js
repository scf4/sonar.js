"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateState = exports.getState = void 0;
let globalState = {
    ws: null,
    wsStatus: 0,
    friends: new Set(),
    friendRequests: new Set(),
    rooms: new Set(),
    cache: {
        assets: {},
        users: new Map(),
        rooms: new Map(),
    },
};
let getState = () => globalState;
exports.getState = getState;
let updateState = (callback) => {
    callback(globalState);
    return globalState;
};
exports.updateState = updateState;
