"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dimension = (function () {
    function Dimension(_a) {
        var x = _a[0], y = _a[1], w = _a[2], h = _a[3];
        _b = [x, y, w, h], this.m_x = _b[0], this.m_y = _b[1], this.m_width = _b[2], this.m_height = _b[3];
        this.m_fixed = false;
        var _b;
    }
    Object.defineProperty(Dimension.prototype, "Left", {
        get: function () {
            return this.m_x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dimension.prototype, "Top", {
        get: function () {
            return this.m_y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dimension.prototype, "Width", {
        get: function () {
            return this.m_width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dimension.prototype, "Height", {
        get: function () {
            return this.m_height;
        },
        enumerable: true,
        configurable: true
    });
    Dimension.prototype.setFixed = function () {
        this.m_fixed = true;
    };
    Object.defineProperty(Dimension.prototype, "Fixed", {
        get: function () {
            return this.m_fixed;
        },
        enumerable: true,
        configurable: true
    });
    Dimension.prototype.toString = function () {
        var d = this;
        return "{(" + d.Left + ", " + d.Top + "), " + d.Width + " x " + d.Height + "}";
    };
    return Dimension;
}());
exports.Dimension = Dimension;
