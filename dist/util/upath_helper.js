"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_helper_1 = require("./dom_helper");
function computeUniquePath(n) {
    var path = '';
    if (n.nodeType == Node.ELEMENT_NODE) {
        var e = n;
        if (e.id) {
            return "#" + e.id;
        }
    }
    if (n.nodeName == 'BODY') {
        return '/';
    }
    var siblings = dom_helper_1.asArray(n.parentNode.childNodes);
    var idx = siblings.indexOf(n);
    return computeUniquePath(n.parentNode) + ("/" + idx);
}
exports.computeUniquePath = computeUniquePath;
function getNodeByPath(doc, uPath) {
    var n = doc.body;
    var parts = uPath.split('/');
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var p = parts_1[_i];
        if (!p.trim()) {
            continue;
        }
        if (p.indexOf('#') == 0) {
            n = doc.getElementById(p.substring(1));
            continue;
        }
        n = n.childNodes[parseInt(p)];
    }
    return n;
}
exports.getNodeByPath = getNodeByPath;
