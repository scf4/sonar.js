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
exports.events = exports.users = exports.rooms = exports.launch = exports.friends = exports.auth = exports.actions = void 0;
const state_1 = require("lib/state");
exports.actions = __importStar(require("./websocket/actions"));
exports.auth = __importStar(require("./endpoints/login"));
exports.friends = __importStar(require("./endpoints/friends"));
exports.launch = __importStar(require("./endpoints/launch"));
exports.rooms = __importStar(require("./endpoints/rooms"));
exports.users = __importStar(require("./endpoints/users"));
var events_1 = require("./events");
Object.defineProperty(exports, "events", { enumerable: true, get: function () { return __importDefault(events_1).default; } });
let shutdown = () => {
    state_1.getState().ws?.close(1000);
    state_1.getState().ws?.terminate();
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
