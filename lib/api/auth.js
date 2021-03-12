"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientHeaders = exports.setAuthData = void 0;
const constants_1 = require("lib/constants");
const platform_1 = require("lib/utils/platform");
const errors_1 = require("lib/errors");
let authData = {
    clientName: process.env.CLIENT_NAME,
    authToken: process.env.AUTH_TOKEN,
};
let setAuthData = (callback) => {
    callback(authData);
    if (!authData.clientName)
        throw errors_1.ClientArgMissingError('clientName');
    if (!authData.authToken)
        throw errors_1.ClientArgMissingError('authToken');
};
exports.setAuthData = setAuthData;
let getClientHeaders = () => ({
    'Authorization': authData.authToken,
    'device-name': authData.clientName,
    'device-id': authData.clientName,
    'User-Agent': `Sonar/${constants_1.SONAR_BUILD} ${authData.clientName} (${platform_1.platform})`,
    'platform': platform_1.platform,
});
exports.getClientHeaders = getClientHeaders;
