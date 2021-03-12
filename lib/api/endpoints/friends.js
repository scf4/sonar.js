"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boop = exports.remove = exports.confirm = exports.add = exports.requests = exports.list = void 0;
const request_1 = require("lib/api/request");
let list = () => request_1.request
    .get('/friends-list')
    .then(res => res.data.friends);
exports.list = list;
let requests = () => request_1.request
    .get('/friends-list')
    .then(res => res.data.requests);
exports.requests = requests;
let add = (userId) => request_1.request.post(`/friendships/${userId}/request`);
exports.add = add;
let confirm = (userId) => request_1.request.post(`/friendships/${userId}/confirm`);
exports.confirm = confirm;
let remove = (userId) => request_1.request.delete(`/friendships/${userId}`);
exports.remove = remove;
let boop = (userId) => request_1.request.post('/poke', { userId });
exports.boop = boop;
