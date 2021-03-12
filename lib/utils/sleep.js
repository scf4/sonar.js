"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
let sleep = (ms) => new Promise(res => setTimeout(res, ms));
exports.sleep = sleep;
