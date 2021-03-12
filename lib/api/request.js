"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request2 = exports.request = exports.getHeaders = void 0;
const axios_1 = __importDefault(require("axios"));
const fast_case_1 = require("fast-case");
const constants_1 = require("lib/constants");
const auth_1 = require("./auth");
let getHeaders = () => ({
    'Accept': '*/*',
    'Accept-Language': 'en-us',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json',
    'version': constants_1.SONAR_VERSION,
    'build': constants_1.SONAR_BUILD,
    ...auth_1.getClientHeaders(),
});
exports.getHeaders = getHeaders;
let createAxiosInstance = (baseUrl = constants_1.HTTPS_URL) => axios_1.default.create({
    baseURL: baseUrl,
    responseType: 'json',
    headers: getHeaders(),
    transformRequest: data => JSON.stringify(fast_case_1.decamelizeKeys(data)),
    transformResponse: body => body && fast_case_1.camelizeKeysInPlace(JSON.parse(body).data),
});
let request = createAxiosInstance(constants_1.HTTPS_URL);
exports.request = request;
let request2 = createAxiosInstance(constants_1.HTTPS_URL_V2);
exports.request2 = request2;
