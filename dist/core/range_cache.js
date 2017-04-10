"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_helper_1 = require("../util/dom_helper");
var upath_helper_1 = require("../util/upath_helper");
var range_meta_1 = require("./range_meta");
var RangeCache = (function () {
    function RangeCache(doc, cac, start, end, startOffset, endOffset, meta) {
        _a = [doc, cac, start, end, startOffset, endOffset], this.m_document = _a[0], this.m_cac = _a[1], this.m_start = _a[2], this.m_end = _a[3], this.m_startOffset = _a[4], this.m_endOffset = _a[5];
        this.setMeta(meta);
        var _a;
    }
    RangeCache.prototype.isExpired = function () {
        for (var _i = 0, _a = [this.m_cac, this.m_start, this.m_end]; _i < _a.length; _i++) {
            var n = _a[_i];
            if (!n || !n.parentNode) {
                return true;
            }
        }
        return false;
    };
    RangeCache.prototype.toRange = function (doc) {
        var r = doc.createRange();
        r.setStart(this.m_start, this.m_startOffset);
        r.setEnd(this.m_end, this.m_endOffset);
        return r;
    };
    Object.defineProperty(RangeCache.prototype, "document", {
        get: function () {
            return this.m_document;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeCache.prototype, "commonAncestorContainer", {
        get: function () {
            return this.m_cac;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeCache.prototype, "startContainer", {
        get: function () {
            return this.m_start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeCache.prototype, "endContainer", {
        get: function () {
            return this.m_end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeCache.prototype, "startOffset", {
        get: function () {
            return this.m_startOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeCache.prototype, "endOffset", {
        get: function () {
            return this.m_endOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeCache.prototype, "meta", {
        get: function () {
            return this.m_meta;
        },
        enumerable: true,
        configurable: true
    });
    RangeCache.prototype.setMeta = function (meta) {
        if (!meta || !meta.text) {
            var anchor = dom_helper_1.findPositionAnchor(this.m_document.defaultView, this.m_cac);
            this.m_meta = new range_meta_1.RangeMeta([
                upath_helper_1.computeUniquePath(anchor), upath_helper_1.computeUniquePath(this.m_start),
                upath_helper_1.computeUniquePath(this.m_end),
                this.toRange(this.m_document).toString()
            ], [this.m_startOffset, this.m_endOffset]);
        }
        else {
            this.m_meta = meta;
        }
    };
    return RangeCache;
}());
RangeCache.make = function (doc, r, meta) {
    return new RangeCache(doc, r.commonAncestorContainer, r.startContainer, r.endContainer, r.startOffset, r.endOffset, meta);
};
exports.RangeCache = RangeCache;
