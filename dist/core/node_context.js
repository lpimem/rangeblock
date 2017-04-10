"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_helper_1 = require("../util/dom_helper");
var NodeContext = (function () {
    function NodeContext(n, rc) {
        this.m_parent = n.parentNode;
        this.m_nextSibling = n.nextSibling;
        this.m_siblings = dom_helper_1.asArray(n.parentNode.childNodes);
        this.m_rangeCache = rc;
        this.m_index = this.m_siblings.indexOf(n);
    }
    Object.defineProperty(NodeContext.prototype, "parent", {
        get: function () {
            return this.m_parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeContext.prototype, "nextSibling", {
        get: function () {
            return this.m_nextSibling;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeContext.prototype, "siblings", {
        get: function () {
            return this.m_siblings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeContext.prototype, "index", {
        get: function () {
            return this.m_index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeContext.prototype, "rangeCache", {
        get: function () {
            return this.m_rangeCache;
        },
        enumerable: true,
        configurable: true
    });
    return NodeContext;
}());
exports.NodeContext = NodeContext;
