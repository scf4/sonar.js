"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.history = exports.sendAction = void 0;
const ws_1 = __importDefault(require("ws"));
const state_1 = require("lib/state");
const errors_1 = require("lib/errors");
const constants_1 = require("lib/constants");
const sleep_1 = require("utils/sleep");
const lodash_1 = require("lodash");
let isProcessing = false;
let queue = [];
let history = [];
exports.history = history;
let sendAction = async (type, data) => {
    queue.push({ type, data });
    await processQueue();
};
exports.sendAction = sendAction;
let processQueue = async () => {
    if (!isProcessing) {
        while (queue.length) {
            let message = queue.shift();
            if (message) {
                await sendMessage(message);
                history.push(message);
            }
            isProcessing = !queue.length;
            await sleep_1.sleep(constants_1.WS_SEND_MESSAGE_RATE_LIMIT);
        }
    }
};
let sendMessage = (data) => new Promise(resolve => {
    let ws = state_1.getState().ws;
    if (!ws)
        throw errors_1.WebSocketDoesntExistError();
    if (ws?.readyState !== ws_1.default.OPEN)
        throw errors_1.WebSocketNotOpenError();
    let message = JSON.stringify(data, ['type', 'data']);
    console.log({ message });
    let callback = (err) => err ? lodash_1.reject(err) : resolve(data);
    ws.send(message, callback);
});
