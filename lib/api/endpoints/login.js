"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeVerification = exports.smsVerification = void 0;
const request_1 = require("lib/api/request");
let smsVerification = (number) => request_1.request
    .post('/users/sms-verification', { number });
exports.smsVerification = smsVerification;
let codeVerification = (number, code) => request_1.request
    .post('/users/code-verification', { number, code });
exports.codeVerification = codeVerification;
