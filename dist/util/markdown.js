"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function h(level, text) {
    return repeat('#', level) + " " + text;
}
exports.h = h;
function em(text) {
    return "_" + text + "_";
}
exports.em = em;
function link(text, link) {
    return "[" + text + "](" + link + ")";
}
exports.link = link;
function ul(items, level) {
    if (level === void 0) { level = 0; }
    var md = "";
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        md += repeat("  ", level) + "* " + item + "\r\n";
    }
    return md;
}
exports.ul = ul;
function repeat(text, count) {
    if (text == null) {
        throw new Error("cannot repeat null");
    }
    var str = "" + text;
    if (count < 0) {
        throw new Error("Cannot repeat negative times");
    }
    if (count == Infinity) {
        throw new Error("Cannot repeat infinite times");
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
        return "";
    }
    if (str.length * count >= 1 << 28) {
        throw new RangeError("repeat count must not overflow maximum string size");
    }
    var rpt = '';
    for (;;) {
        if ((count & 1) == 1) {
            rpt += str;
        }
        count >>>= 1;
        if (count == 0) {
            break;
        }
        str += str;
    }
    return rpt;
}
