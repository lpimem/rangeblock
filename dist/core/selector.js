"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_helper_1 = require("../util/dom_helper");
var id_helper_1 = require("../util/id_helper");
var block_1 = require("./block");
var node_measure_1 = require("./node_measure");
var range_cache_1 = require("./range_cache");
var range_helper_1 = require("./range_helper");
var logez_1 = require("logez");
function extractSelectedBlock(win, doc, id) {
    var range = dom_helper_1.getSelectedRange(win);
    if (null == range || range.collapsed) {
        logez_1.debug('no selected range detected.');
        return null;
    }
    var rc = range_cache_1.RangeCache.make(doc, range);
    dom_helper_1.clearSelection(win);
    return generateBlock(doc, rc, id);
}
exports.extractSelectedBlock = extractSelectedBlock;
function restoreBlock(win, doc, meta, id, checkTextMatch) {
    var rc = range_helper_1.restoreRangeCache(doc, meta, checkTextMatch);
    return generateBlock(doc, rc, id);
}
exports.restoreBlock = restoreBlock;
function generateBlock(doc, rangeCache, id) {
    var dims = node_measure_1.computeDimentions(doc, rangeCache);
    if (!id) {
        id = id_helper_1.generateRandomUUID();
    }
    return new block_1.Block(id, rangeCache, dims);
}
