"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueSonarId = void 0;
const errors_1 = require("lib/errors");
const state_1 = require("lib/state");
let sonarIdCount = 0;
let generateUniqueSonarId = () => {
    sonarIdCount += 1;
    let userId = state_1.getState().userId ?? errors_1.NoUserIdError();
    let timestamp = Date.now().toString();
    return `${userId}-${timestamp}.${sonarIdCount}`;
};
exports.generateUniqueSonarId = generateUniqueSonarId;
