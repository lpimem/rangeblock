"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var range_helper_1 = require("./range_helper");
var node_measure_1 = require("./node_measure");
var Block = (function () {
    function Block(id, rangeCache, dimensions) {
        this.m_id = id;
        this.m_rangeCache = rangeCache;
        this.m_dimensions = dimensions;
    }
    Block.prototype.setId = function (id) {
        this.m_id = id;
    };
    Object.defineProperty(Block.prototype, "id", {
        get: function () {
            return this.m_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "rangeCache", {
        get: function () {
            return this.m_rangeCache;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "rangeMeta", {
        get: function () {
            return this.m_rangeCache.meta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "dimensions", {
        get: function () {
            return this.m_dimensions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "text", {
        get: function () {
            return this.rangeMeta.text;
        },
        enumerable: true,
        configurable: true
    });
    Block.prototype.recalculateDimension = function () {
        if (range_helper_1.isRangeDetached(this.rangeCache)) {
            this.rebuild();
        }
        this.m_dimensions =
            node_measure_1.computeDimentions(this.m_rangeCache.document, this.m_rangeCache);
    };
    Block.prototype.rebuild = function () {
        this.m_rangeCache = range_helper_1.restoreRangeCache(this.rangeCache.document, this.rangeCache.meta);
    };
    return Block;
}());
exports.Block = Block;
