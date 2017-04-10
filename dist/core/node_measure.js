"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_helper_1 = require("../util/array_helper");
var upath_helper_1 = require("../util/upath_helper");
var node_measure_impl_1 = require("./node_measure_impl");
var range_cache_1 = require("./range_cache");
var range_helper_1 = require("./range_helper");
function computeDimentions(doc, range) {
    var dims = [];
    var rc = null;
    if (range_helper_1.isRange(range)) {
        rc = range_cache_1.RangeCache.make(doc, range);
    }
    else {
        rc = range;
    }
    rc = range_helper_1.correctRange(rc);
    range_helper_1.iterateRangeNodes(rc, buildNodeToDimVisitor(document, dims));
    return node_measure_impl_1.mergeDimensions(dims);
}
exports.computeDimentions = computeDimentions;
function buildNodeToDimVisitor(doc, result) {
    return function (n, ctx, s, e) {
        var dims = nodeToDimensions(doc, n, ctx, s, e);
        array_helper_1.extend(result, dims);
    };
}
function nodeToDimensions(doc, n, ctx, start, end) {
    if (n.nodeType == Node.TEXT_NODE) {
        return textNodeToDim(doc, n, ctx, start, end);
    }
    else {
        return [];
    }
}
function textNodeToDim(doc, n, ctx, start, end) {
    var span = node_measure_impl_1.substitudeWithMeasureSpan(doc, n, ctx, start, end);
    var dims = node_measure_impl_1.measureSpanToDim(span, doc, function (doc, el) {
        var anchor = upath_helper_1.getNodeByPath(doc, ctx.rangeCache.meta.anchorUPath);
        return node_measure_impl_1.computeLayout(doc, anchor, el);
    });
    node_measure_impl_1.restoreBeforeMeasureStatus(ctx.parent, ctx.index, ctx.siblings);
    return dims;
}
