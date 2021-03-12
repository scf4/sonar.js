"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropItem = exports.unmuteSelf = exports.muteSelf = exports.updateColor = exports.updateStatusText = exports.move = exports.horn = void 0;
const errors_1 = require("lib/errors");
const state_1 = require("lib/state");
const uid_1 = require("utils/uid");
const send_message_1 = require("./send-message");
let horn = () => send_message_1.sendAction('horn');
exports.horn = horn;
let muteSelf = () => send_message_1.sendAction('is_self_muted_update', { isSelfMuted: true });
exports.muteSelf = muteSelf;
let unmuteSelf = () => send_message_1.sendAction('is_self_muted_update', { isSelfMuted: false });
exports.unmuteSelf = unmuteSelf;
let move = async (x, y) => {
    state_1.updateState(state => {
        if (!state.room)
            throw errors_1.UnexpectedError('No current room');
        state.room.position.x = x;
        state.room.position.y = y;
    });
    let moveId = state_1.updateState(state => state.moveId += 1).moveId;
    send_message_1.sendAction('move', { x, y, moveId });
};
exports.move = move;
let updateStatusText = (statusText) => send_message_1.sendAction('status_text_update', { statusText });
exports.updateStatusText = updateStatusText;
let updateColor = (color) => send_message_1.sendAction('color_update', { color });
exports.updateColor = updateColor;
let dropItem = (name, x, y) => {
    let { room } = state_1.getState();
    x ?? (x = room?.position.x ?? 0);
    y ?? (y = room?.position.y ?? 0);
    return send_message_1.sendAction('drop_droppable', {
        name,
        clientGeneratedId: uid_1.generateUniqueSonarId(),
        desiredX: x,
        desiredY: y,
    });
};
exports.dropItem = dropItem;
