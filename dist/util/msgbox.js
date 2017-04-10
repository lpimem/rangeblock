"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("./log");
var box = null;
var mbox = null;
function init() {
    if (box != null) {
        return;
    }
    var d = top.document;
    var color = "beige";
    box = d.createElement("div");
    box.className = "hlc_msgbox";
    mbox = d.createElement("pre");
    box.appendChild(mbox);
    var cl = d.createElement("div");
    cl.style.width = "30px";
    cl.style.height = "30px";
    cl.innerText = "X";
    cl.style.position = "absolute";
    cl.style.top = "5px";
    cl.style.right = "5px";
    cl.style.marginRight = "15px";
    cl.style.textAlign = "center";
    cl.style.verticalAlign = "middle";
    cl.style.lineHeight = "30px";
    cl.style.border = "1px black dashed";
    cl.style.opacity = "0.25";
    cl.style.boxShadow = "0 0 0";
    cl.style.cursor = "pointer";
    box.appendChild(cl);
    d.body.appendChild(box);
    cl.addEventListener("click", hide);
    cl.addEventListener("mouseover", function () {
        cl.style.opacity = "0.85";
        cl.style.boxShadow = "0 1px 5px rgba(0,0,0,0.25)";
    });
    cl.addEventListener("mouseout", function () {
        cl.style.opacity = "0.25";
        cl.style.boxShadow = "0 0 0";
    });
    hide();
}
exports.init = init;
function show(msg) {
    if (box) {
        mbox.textContent = msg + "\r\n";
        box.style.display = "block";
    }
    else {
        log_1.warn("msgbox is not inited");
    }
}
exports.show = show;
function hide() {
    if (box) {
        box.style.display = "none";
    }
}
exports.hide = hide;
function setBoxStyle(style) {
    for (var k in style) {
        box.style[k] = style[k];
    }
}
exports.setBoxStyle = setBoxStyle;
function move(left, top, unit) {
    if (unit === void 0) { unit = 'px'; }
    box.style.left = "" + left + unit;
    box.style.top = "" + top + unit;
}
exports.move = move;
function resize(width, height, unit) {
    if (!unit) {
        unit = "px";
    }
    var w = width ? "" + width + unit : "auto";
    var h = height ? "" + height + unit : "auto";
    box.style.width = w;
    box.style.height = h;
}
exports.resize = resize;
function isOpen() {
    return box.style.display != "none";
}
exports.isOpen = isOpen;
