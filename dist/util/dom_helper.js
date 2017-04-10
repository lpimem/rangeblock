"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logez_1 = require("logez");
function asArray(collection) {
    return Array.prototype.slice.apply(collection);
}
exports.asArray = asArray;
function select(w, r) {
    var sel = w.getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
}
exports.select = select;
function getSelectedRange(w) {
    try {
        return w.getSelection().getRangeAt(0);
    }
    catch (ignore) {
        return null;
    }
}
exports.getSelectedRange = getSelectedRange;
function clearSelection(w) {
    w.getSelection().removeAllRanges();
}
exports.clearSelection = clearSelection;
function findPositionAnchor(w, n) {
    var e = null;
    if (n.nodeType != Node.ELEMENT_NODE) {
        e = n.parentElement;
    }
    else {
        e = n;
    }
    if (e == null) {
        throw 'no element parent found';
    }
    do {
        var stl = w.getComputedStyle(e);
        if (stl.position == 'relative' || stl.position == 'fixed') {
            return e;
        }
        else {
            e = e.parentElement;
        }
    } while (e);
    var b = w.document.body;
    logez_1.warn("no position anchor found, using body (" + w.getComputedStyle(b).position + ").");
    return b;
}
exports.findPositionAnchor = findPositionAnchor;
var BoxSizing;
(function (BoxSizing) {
    BoxSizing[BoxSizing["ContentBox"] = 0] = "ContentBox";
    BoxSizing[BoxSizing["BorderBox"] = 1] = "BorderBox";
})(BoxSizing = exports.BoxSizing || (exports.BoxSizing = {}));
function getBoxSizing(w, e) {
    var bs = w.getComputedStyle(e).boxSizing;
    if (bs == 'content-box') {
        return BoxSizing.ContentBox;
    }
    else if (bs = 'border-box') {
        return BoxSizing.BorderBox;
    }
    else {
        throw 'unknown box sizing option.';
    }
}
exports.getBoxSizing = getBoxSizing;
function getStyleNumber(stl, name) {
    var strVal = stl[name];
    var match = /\d+/.exec(strVal);
    if (match) {
        return Number(match[0]);
    }
    throw Error("cannot parse number from style " + name + ": " + strVal);
}
exports.getStyleNumber = getStyleNumber;
function createStyleSheet(doc, content) {
    var styleEl = doc.createElement('style');
    styleEl.innerHTML = content;
    doc.body.appendChild(styleEl);
    var idx = doc.styleSheets.length - 1;
    return doc.styleSheets.item(idx);
}
exports.createStyleSheet = createStyleSheet;
