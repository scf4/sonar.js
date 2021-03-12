"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientArgMissingError = exports.UnexpectedError = exports.WebSocketDidntConnectError = exports.WebSocketNotOpenError = exports.WebSocketDoesntExistError = exports.NoUserIdError = exports.UnauthenticatedError = exports.StateCheckCallError = void 0;
let createError = (...errors) => {
    let message = errors
        .map(e => e?.toString())
        .filter(e => !!e)
        .join('\n');
    throw new Error(message);
};
let StateCheckCallError = (state, msg) => createError(`State check error: ${state}`, msg);
exports.StateCheckCallError = StateCheckCallError;
let UnauthenticatedError = () => createError('Not logged in');
exports.UnauthenticatedError = UnauthenticatedError;
let NoUserIdError = () => createError('No user ID in data store');
exports.NoUserIdError = NoUserIdError;
let WebSocketDoesntExistError = () => createError('No WebSocket instance was created');
exports.WebSocketDoesntExistError = WebSocketDoesntExistError;
let WebSocketNotOpenError = () => createError('WebSocket isn\'t open');
exports.WebSocketNotOpenError = WebSocketNotOpenError;
let WebSocketDidntConnectError = () => createError('WebSocket didn\t connect');
exports.WebSocketDidntConnectError = WebSocketDidntConnectError;
let UnexpectedError = (msg, err) => createError(`Unexpected error: ${msg}`, err);
exports.UnexpectedError = UnexpectedError;
let ClientArgMissingError = (arg) => createError(`Missing client args: ${arg}`);
exports.ClientArgMissingError = ClientArgMissingError;
