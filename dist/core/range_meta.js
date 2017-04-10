"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RangeMeta = (function () {
    function RangeMeta(_a, _b) {
        var anchorUPath = _a[0], startNodeUPath = _a[1], endNodeUPath = _a[2], text = _a[3];
        var startCharIndex = _b[0], endCharIndex = _b[1];
        _c = [anchorUPath, startNodeUPath, endNodeUPath, text], this.m_anchorUPath = _c[0], this.m_startNodeUPath = _c[1], this.m_endNodeUPath = _c[2], this.m_text = _c[3];
        _d = [startCharIndex, endCharIndex], this.m_startCharIndex = _d[0], this.m_endCharIndex = _d[1];
        var _c, _d;
    }
    Object.defineProperty(RangeMeta.prototype, "anchorUPath", {
        get: function () {
            return this.m_anchorUPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeMeta.prototype, "startNodeUPath", {
        get: function () {
            return this.m_startNodeUPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeMeta.prototype, "endNodeUPath", {
        get: function () {
            return this.m_endNodeUPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeMeta.prototype, "startCharIndex", {
        get: function () {
            return this.m_startCharIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeMeta.prototype, "endCharIndex", {
        get: function () {
            return this.m_endCharIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeMeta.prototype, "text", {
        get: function () {
            return this.m_text;
        },
        enumerable: true,
        configurable: true
    });
    return RangeMeta;
}());
exports.RangeMeta = RangeMeta;
