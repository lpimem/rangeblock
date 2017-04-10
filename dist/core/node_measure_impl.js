"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants = require("../options");
var options_1 = require("../options");
var dom_helper = require("../util/dom_helper");
var dimension_1 = require("./dimension");
function measureSpanToDim(s, doc, calc) {
    var cspans = dom_helper.asArray(s.children);
    var dims = [];
    for (var _i = 0, cspans_1 = cspans; _i < cspans_1.length; _i++) {
        var span = cspans_1[_i];
        var dim = calc(doc, span);
        dims.push(dim);
    }
    return dims;
}
exports.measureSpanToDim = measureSpanToDim;
function mergeDimensions(dims) {
    var merged = [];
    var current = null;
    var pre = null;
    var maxIdx = dims.length - 1;
    for (var i in dims) {
        var d = dims[i];
        if (current == null) {
            current = d;
            pre = d;
            continue;
        }
        var charW = pre.Width;
        var charH = pre.Height;
        if (isInsameRow(d, current, charW, charH)) {
            current = doMerge(d, current);
        }
        else {
            merged.push(current);
            current = d;
        }
        if (Number(i) == maxIdx) {
            merged.push(current);
        }
        else {
            pre = d;
        }
    }
    return merged;
}
exports.mergeDimensions = mergeDimensions;
function isInsameRow(a, b, charW, charH) {
    if (a.Left > b.Left) {
        _a = [b, a], a = _a[0], b = _a[1];
    }
    var maxHGap = charW * options_1.SameRowHFactor();
    var maxVGap = charH * options_1.SameRowVFactor();
    var h_gap = b.Left - (a.Left + a.Width);
    var isInRangeHorizontal = h_gap <= maxHGap;
    var v_gap = Math.abs(a.Top - b.Top);
    var isInRangeVertical = v_gap <= maxVGap;
    return isInRangeHorizontal && isInRangeVertical;
    var _a;
}
exports.isInsameRow = isInsameRow;
function doMerge(a, b) {
    if (a.Left > b.Left) {
        _a = [b, a], a = _a[0], b = _a[1];
    }
    var top = Math.min(a.Top, b.Top);
    var height = Math.max(a.Top + a.Height - top, b.Top + b.Height - top);
    return new dimension_1.Dimension([a.Left, top, (b.Left + b.Width - a.Left), height]);
    var _a;
}
exports.doMerge = doMerge;
function substitudeWithMeasureSpan(doc, n, ctx, start, end) {
    if (n.nodeType != Node.TEXT_NODE) {
        return;
    }
    removeFollowing(ctx.parent, ctx.index);
    var parent = ctx.parent;
    parent.removeChild(n);
    var preTextNode = doc.createTextNode(n.textContent.substring(0, start));
    var selText = n.textContent.substring(start, end);
    var textNode = doc.createTextNode(selText);
    var postTextNode = doc.createTextNode(n.textContent.substring(end, n.textContent.length));
    parent.appendChild(preTextNode);
    var wrapper = wrapText(doc, textNode);
    parent.appendChild(wrapper);
    parent.appendChild(postTextNode);
    appendFollowing(parent, ctx.index, ctx.siblings);
    return wrapper;
}
exports.substitudeWithMeasureSpan = substitudeWithMeasureSpan;
function restoreBeforeMeasureStatus(parent, nodeIdx, siblings) {
    removeFollowing(parent, nodeIdx - 1);
    appendFollowing(parent, nodeIdx - 1, siblings);
}
exports.restoreBeforeMeasureStatus = restoreBeforeMeasureStatus;
function removeFollowing(parent, startIdx) {
    var children = dom_helper.asArray(parent.childNodes);
    for (var i = children.length - 1; i > startIdx; i--) {
        parent.removeChild(children[i]);
    }
}
exports.removeFollowing = removeFollowing;
function appendFollowing(parent, nodeIdx, siblings) {
    for (var i = nodeIdx + 1; i < siblings.length; i++) {
        parent.appendChild(siblings[i]);
    }
}
exports.appendFollowing = appendFollowing;
function wrapText(doc, textNode) {
    var span = doc.createElement('span');
    var text = textNode.textContent;
    for (var i = 0; i < text.length; i++) {
        var charSpan = doc.createElement('span');
        charSpan.className = constants.MeasureSpanClass();
        var charNode = doc.createTextNode(text.charAt(i));
        charSpan.appendChild(charNode);
        adaptMeasureSpanLayout(charSpan);
        span.appendChild(charSpan);
    }
    adaptMeasureSpanLayout(span);
    return span;
}
exports.wrapText = wrapText;
function getContentOffsets(w, doc, e) {
    var rect = e.getBoundingClientRect();
    var styles = w.getComputedStyle(e);
    var borderLeft = 0;
    var borderTop = 0;
    var boxSizing = dom_helper.getBoxSizing(w, e);
    if (boxSizing == dom_helper.BoxSizing.ContentBox) {
        borderLeft = dom_helper.getStyleNumber(styles, "borderLeftWidth");
        borderTop = dom_helper.getStyleNumber(styles, "borderTopWidth");
    }
    var fixed = false;
    var scrollY = w.pageYOffset;
    var scrollX = w.pageXOffset;
    if (styles.position == "fixed") {
        scrollX = 0;
        scrollY = 0;
        fixed = true;
    }
    var dim = new dimension_1.Dimension([
        rect.left + borderLeft + scrollX,
        rect.top + borderTop + scrollY,
        rect.width,
        rect.height
    ]);
    if (fixed) {
        dim.setFixed();
    }
    return dim;
}
function computeLayout(doc, anchor, e) {
    var w = doc.defaultView;
    var eOffset = getContentOffsets(w, doc, e);
    var anchorStyles = w.getComputedStyle(anchor);
    if (anchorStyles.position == "relative" && !eOffset.Fixed) {
        var anchorOffset = getContentOffsets(w, doc, anchor);
        return new dimension_1.Dimension([
            eOffset.Left - anchorOffset.Left,
            eOffset.Top - anchorOffset.Top,
            eOffset.Width,
            eOffset.Height
        ]);
    }
    return eOffset;
}
exports.computeLayout = computeLayout;
function getElementOffsetLayout(doc, el) {
    return new dimension_1.Dimension([el.offsetLeft, el.offsetTop, el.offsetWidth, el.offsetHeight]);
}
exports.getElementOffsetLayout = getElementOffsetLayout;
function adaptMeasureSpanLayout(sp, debug) {
    if (debug === void 0) { debug = true; }
    sp.style.margin = '0';
    sp.style.padding = '0';
    sp.style.border = '0';
    sp.style.font = 'inherit';
    sp.style.fontSize = 'inherit';
    sp.style.verticalAlign = 'inherit';
    if (debug) {
        sp.style.backgroundColor = 'lightgreen';
    }
}
exports.adaptMeasureSpanLayout = adaptMeasureSpanLayout;
