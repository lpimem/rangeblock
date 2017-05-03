"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var upath_helper_1 = require("../util/upath_helper");
var node_context_1 = require("./node_context");
var range_cache_1 = require("./range_cache");
var logger = require("logez");
function iterateRangeNodes(range, visit) {
    var endOffset = range.startContainer == range.endContainer ?
        range.endOffset :
        getNodeTextEndIdx(range.startContainer);
    var q = [[range.startContainer, range.startOffset, endOffset]];
    while (q.length > 0) {
        var _a = q.shift(), node = _a[0], start = _a[1], end = _a[2];
        if (node.hasChildNodes()) {
            var next = node.firstChild;
            var endOffset_1 = next == range.endContainer ? range.endOffset :
                getNodeTextEndIdx(next);
            q.push([next, 0, endOffset_1]);
            continue;
        }
        var ctx = new node_context_1.NodeContext(node, range);
        visit(node, ctx, start, end);
        if (node == range.endContainer || node == range.commonAncestorContainer) {
            return;
        }
        if (ctx.nextSibling) {
            var endOffset_2 = ctx.nextSibling == range.endContainer ?
                range.endOffset :
                getNodeTextEndIdx(ctx.nextSibling);
            q.push([ctx.nextSibling, 0, endOffset_2]);
        }
        else {
            tracebackParentNodes(ctx.parent, range, q);
        }
    }
    logger.error('lastChild', range.commonAncestorContainer.lastChild);
    logger.error('endContainer', range.endContainer);
    logger.error('startContainer', range.startContainer);
    logger.error('commonAncestorContainer:', range.commonAncestorContainer);
    throw 'iterateRangeNodes: end of sub dom tree met.';
}
exports.iterateRangeNodes = iterateRangeNodes;
function correctRange(rc) {
    rc = correctEndNode(rc);
    return rc;
}
exports.correctRange = correctRange;
function correctEndNode(rc) {
    if (rc.endContainer.nodeType == Node.ELEMENT_NODE && rc.endOffset == 0) {
        logger.debug('range needs correct.');
        var newEnd = rc.endContainer.firstChild;
        var newEndOffset = 0;
        return new range_cache_1.RangeCache(rc.document, rc.commonAncestorContainer, rc.startContainer, newEnd, rc.startOffset, newEndOffset, rc.meta);
    }
    return rc;
}
function isRangeDetached(rc) {
    return (!rc.commonAncestorContainer.parentNode) ||
        (!rc.startContainer.parentNode) || (!rc.endContainer.parentNode);
}
exports.isRangeDetached = isRangeDetached;
function isRange(r) {
    var asRange = r;
    return asRange.collapse !== undefined && asRange.setStart !== undefined;
}
exports.isRange = isRange;
function getNodeTextEndIdx(node) {
    return node.textContent.length;
}
function tracebackParentNodes(parent, range, q) {
    while (parent != range.commonAncestorContainer) {
        if (parent.nextSibling) {
            var next = parent.nextSibling;
            var endOffset = next == range.endContainer ? range.endOffset :
                next.textContent.length;
            q.push([next, 0, endOffset]);
            break;
        }
        else {
            parent = parent.parentNode;
        }
    }
}
function restoreRangeCache(doc, meta) {
    var rangeAnchors = [];
    for (var _i = 0, _a = [meta.startNodeUPath, meta.endNodeUPath]; _i < _a.length; _i++) {
        var uPath = _a[_i];
        try {
            var n = upath_helper_1.getNodeByPath(doc, uPath);
            rangeAnchors.push(n);
        }
        catch (e) {
            logger.error(e);
            return null;
        }
    }
    var r = doc.createRange();
    r.setStart(rangeAnchors[0], meta.startCharIndex);
    r.setEnd(rangeAnchors[1], meta.endCharIndex);
    var rc = range_cache_1.RangeCache.make(doc, r, meta);
    return rc;
}
exports.restoreRangeCache = restoreRangeCache;
