"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNotificationSetting = exports.unmute = exports.mute = exports.items = exports.search = void 0;
const request_1 = require("lib/api/request");
let search = (usernames) => request_1.request
    .post('/users/search', { usernames })
    .then(res => res.data.users);
exports.search = search;
let items = (userId) => request_1.request
    .post('/users/items', { userId })
    .then(res => res.data);
exports.items = items;
let mute = (userId) => request_1.request
    .post(`/mutes/${userId}`);
exports.mute = mute;
let unmute = (userId) => request_1.request
    .delete(`/mutes/${userId}`);
exports.unmute = unmute;
let setNotificationSetting = (userId, notificationSetting) => request_1.request
    .post(`/notifs/modify-user-setting`, { userId, notificationSetting });
exports.setNotificationSetting = setNotificationSetting;
