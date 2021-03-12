"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateCheck = exports.loadAssets = void 0;
const request_1 = require("lib/api/request");
const constants_1 = require("lib/constants");
const errors_1 = require("lib/errors");
const state_1 = require("lib/state");
let loadAssets = async () => {
    let hash = state_1.getState().cache.assets.hash ?? '';
    let path = hash ? `/assets?hash=${hash}` : '/assets';
    let res = await request_1.request.get(path);
    let droppables = new Map(Object.entries(res.data.droppables));
    state_1.updateState(state => {
        Object.assign(state.cache.assets, res.data, { droppables });
    });
};
exports.loadAssets = loadAssets;
let stateCheck = async () => {
    let path = `/state-check?version=${constants_1.SONAR_VERSION}&build=${constants_1.SONAR_BUILD}`;
    let res = await request_1.request.get(path);
    if (res.data.state !== 'ok') {
        throw errors_1.StateCheckCallError(res.data.state, res.data.message);
    }
};
exports.stateCheck = stateCheck;
