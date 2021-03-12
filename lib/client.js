"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
require('dotenv/config');
const api = __importStar(require("./api/index"));
const auth_1 = require("./api/auth");
const errors_1 = require("./errors");
const state_1 = require("./state");
let createClient = async (args, createWebSocket = true) => {
    state_1.updateState(state => {
        state.userId ?? (state.userId = args?.userId ?? Number(process.env.USER_ID));
        state.initialRoomId ?? (state.initialRoomId = args?.roomId ?? Number(process.env.ROOM_ID));
    });
    auth_1.setAuthData(store => {
        store.authToken ?? (store.authToken = args?.authToken ?? errors_1.ClientArgMissingError('authToken'));
        store.clientName ?? (store.clientName = args?.clientName ?? errors_1.ClientArgMissingError('clientName'));
    });
    await api.launch.stateCheck();
    await api.launch.loadAssets();
    if (createWebSocket) {
        let roomId = state_1.getState().initialRoomId;
        await api.rooms.join({ roomId });
    }
    return api;
};
exports.createClient = createClient;
