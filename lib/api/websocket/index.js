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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateState = exports.actions = exports.createWebSocket = void 0;
const ws_1 = __importDefault(require("ws"));
const querystring_1 = require("querystring");
const fast_case_1 = require("fast-case");
const request_1 = require("lib/api/request");
const constants_1 = require("lib/constants");
const state_1 = require("lib/state");
Object.defineProperty(exports, "updateState", { enumerable: true, get: function () { return state_1.updateState; } });
const actions = __importStar(require("./actions"));
exports.actions = actions;
const handle_message_1 = require("./handle-message/index");
let createWebSocket = async (args = {}) => {
    args.viewportWidth ?? (args.viewportWidth = 31);
    args.viewportHeight ?? (args.viewportHeight = 31);
    args.joinSilently ?? (args.joinSilently = true);
    if (state_1.getState().ws?.readyState === ws_1.default.OPEN) {
        console.warn('WebSocket already open');
        state_1.getState().ws?.close();
    }
    let queryString = querystring_1.encode(fast_case_1.decamelizeKeys(args));
    let url = constants_1.WSS_URL + '/join-room?' + queryString;
    console.log(url);
    let ws = new ws_1.default(url, { headers: request_1.getHeaders() });
    ws.addEventListener('message', msg => {
        let data = JSON.parse(msg.data);
        fast_case_1.camelizeKeysInPlace(data);
        handle_message_1.handleMessage(data);
    });
    ws.addEventListener('close', ({ wasClean, code, reason }) => {
        state_1.updateState(state => state.wsStatus = ws.readyState);
        console.warn('Websocket closed:' + JSON.stringify({ code, reason, wasClean }));
    });
    ws.addEventListener('error', ({ error, message, type }) => {
        console.error('Websocket error: ' + JSON.stringify({ error, message, type }));
    });
    await new Promise(resolve => {
        if (ws.readyState === ws_1.default.OPEN) {
            state_1.updateState(state => state.wsStatus = ws_1.default.OPEN);
            resolve();
        }
        ws.addEventListener('open', () => {
            state_1.updateState(state => state.ws = ws);
            state_1.updateState(state => state.wsStatus = ws.readyState);
            ws.send('Ping');
            resolve();
            ws.removeEventListener('open');
        });
    });
    state_1.updateState(state => {
        state.ws = ws;
        state.wsStatus = ws.readyState;
    });
    return { actions };
};
exports.createWebSocket = createWebSocket;
