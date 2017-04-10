"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRandomUUID() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() +
        s4() + s4();
}
exports.generateRandomUUID = generateRandomUUID;
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
