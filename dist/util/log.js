"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var __level = LogLevel.DEBUG;
function setLogLevel(level) {
    __level = level;
}
exports.setLogLevel = setLogLevel;
function levelToString(level) {
    switch (level) {
        case LogLevel.DEBUG:
            return 'debug';
        case LogLevel.INFO:
            return 'info';
        case LogLevel.WARN:
            return 'warn';
        case LogLevel.ERROR:
            return 'error';
        default:
            return 'debug';
    }
}
function log(level, messages) {
    if (level >= __level) {
        if (console) {
            var stub = levelToString(level);
            if (messages.length <= 0) {
                messages = ['\r\n'];
            }
            var msg = messages.length > 1 ? messages : messages[0];
            try {
                (console[stub])(msg);
            }
            catch (ignore) { }
        }
    }
}
function debug() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    log(LogLevel.DEBUG, messages);
}
exports.debug = debug;
function info() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    log(LogLevel.INFO, messages);
}
exports.info = info;
function warn() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    log(LogLevel.WARN, messages);
}
exports.warn = warn;
function error() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    log(LogLevel.ERROR, messages);
}
exports.error = error;
