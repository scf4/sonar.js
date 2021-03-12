"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meta = exports.unlockEditing = exports.lockEditing = exports.removeModerator = exports.addModerator = exports.unban = exports.ban = exports.moderators = exports.members = exports.bannedUsers = exports.uninvitedFriends = exports.uninvite = exports.invite = exports.unlock = exports.lock = exports.remove = exports.rename = exports.create = exports.join = exports.list = exports.current = void 0;
const state_1 = require("lib/state");
const request_1 = require("lib/api/request");
const websocket_1 = require("lib/api/websocket");
let current = () => state_1.getState()?.room ?? null;
exports.current = current;
let join = websocket_1.createWebSocket;
exports.join = join;
let list = () => request_1.request
    .get('/rooms')
    .then(res => res.data.rooms);
exports.list = list;
let create = () => request_1.request
    .post('/rooms')
    .then(res => res.data.room);
exports.create = create;
let rename = (roomId, name) => request_1.request
    .patch(`/rooms/${roomId}`, { name });
exports.rename = rename;
let remove = (roomId) => request_1.request
    .delete(`/room-memberships/${roomId}`);
exports.remove = remove;
let invite = (roomId, userId) => request_1.request
    .post(`/rooms/${roomId}/invite`, { userId });
exports.invite = invite;
let uninvite = (roomId, userId) => request_1.request
    .post(`/rooms/${roomId}/uninvite`, { userId });
exports.uninvite = uninvite;
let uninvitedFriends = (roomId) => request_1.request
    .get(`/rooms/${roomId}/uninvited-friends`)
    .then(res => res.data);
exports.uninvitedFriends = uninvitedFriends;
let ban = (roomId, userId) => request_1.request
    .post(`/rooms/${roomId}/banned_users/add`, { userId });
exports.ban = ban;
let unban = (roomId, userId) => request_1.request
    .post(`/rooms/${roomId}/banned_users/remove`, { userId });
exports.unban = unban;
let addModerator = (roomId, userId) => request_1.request
    .post(`/rooms/${roomId}/moderators/add`, { userId });
exports.addModerator = addModerator;
let removeModerator = (roomId, userId) => request_1.request
    .post(`/rooms/${roomId}/moderators/remove`, { userId });
exports.removeModerator = removeModerator;
let lockEditing = (roomId) => request_1.request
    .patch(`/rooms/${roomId}`, { droppablesModification_permission: 'creator_only' });
exports.lockEditing = lockEditing;
let unlockEditing = (roomId) => request_1.request
    .patch(`/rooms/${roomId}`, { droppablesModificationPermission: 'everyone' });
exports.unlockEditing = unlockEditing;
let lock = (roomId) => request_1.request
    .post(`/rooms/${roomId}/lock`);
exports.lock = lock;
let unlock = (roomId) => request_1.request
    .post(`/rooms/${roomId}/unlock`);
exports.unlock = unlock;
let meta = (roomId) => request_1.request2
    .get(`/rooms/${roomId}`)
    .then(res => res.data);
exports.meta = meta;
let moderators = (roomId) => meta(roomId)
    .then(data => data.moderators);
exports.moderators = moderators;
let members = (roomId) => meta(roomId)
    .then(data => data.members);
exports.members = members;
let bannedUsers = (roomId) => meta(roomId)
    .then(data => data.banned);
exports.bannedUsers = bannedUsers;
