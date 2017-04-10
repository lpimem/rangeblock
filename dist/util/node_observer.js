"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeObserver = (function () {
    function NodeObserver(n, callback, options) {
        if (options === void 0) { options = DefaultMutationObserverInit; }
        this.m_node = n;
        this.createOb(callback);
        this.m_ob.observe(this.m_node, {});
    }
    NodeObserver.prototype.start = function (options) {
        if (!options) {
            options = DefaultMutationObserverInit;
        }
    };
    NodeObserver.prototype.stop = function () {
        var r = this.m_ob.takeRecords();
        this.m_ob.disconnect();
        return r;
    };
    NodeObserver.prototype.createOb = function (callback) {
        this.m_ob = new MutationObserver(callback);
    };
    return NodeObserver;
}());
exports.NodeObserver = NodeObserver;
var DefaultMutationObserverInit = {
    attributes: true,
    subtree: true,
    attributeFilter: ["style", "top", "left", "height", "width"]
};
