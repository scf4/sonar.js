"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../index");
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
async function main() {
    const sonar = await __1.createClient();
    await sleep(1000);
    await sonar.actions.updateColor('FFF700');
    await sonar.actions.updateStatusText('@sonargram');
    sonar.actions.move(0, 0);
    sonar.actions.move(5, 2);
    sonar.actions.move(1, 5);
    sonar.actions.move(19, -1);
    sonar.actions.move(-1, 10);
    sonar.actions.move(-3, -1);
}
main();
