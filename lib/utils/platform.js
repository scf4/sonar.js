"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platform = void 0;
let platform = (() => {
    if (globalThis?.process?.env?.SONAR_PLATFORM)
        return process.env.SONAR_PLATFORM;
    if (globalThis?.window && (!globalThis.process || globalThis.process['browser']))
        return 'Web';
    if (globalThis?.navigator?.product === 'ReactNative')
        return 'ReactNative';
    if (globalThis?.process.versions.electron)
        return 'Electron';
    if (globalThis?.process.versions.node)
        return 'Node';
    return 'Unknown';
})();
exports.platform = platform;
