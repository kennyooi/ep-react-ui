'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Ripple wave animation helpers
                                                                                                                                                                                                                                                                               * @refs -> https://github.com/Dogfalo/materialize/blob/master/js/waves.js
                                                                                                                                                                                                                                                                               */

exports.isWindow = isWindow;
exports.getWindow = getWindow;
exports.offset = offset;
exports.convertStyle = convertStyle;

var _lodash = require('lodash');

// Find exact position of element
function isWindow(obj) {
    return obj !== null && obj === obj.window;
}

function getWindow(el) {
    return isWindow(el) ? el : el.nodeType === 9 && el.defaultView;
}

function offset(el) {
    var docElem = void 0,
        win = void 0,
        box = { top: 0, left: 0 },
        doc = el && el.ownerDocument;

    docElem = doc.documentElement;

    if (_typeof(el.getBoundingClientRect) !== (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined))) {
        box = el.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
}

function convertStyle(obj) {
    var style = '';

    (0, _lodash.map)(obj, function (val, key) {
        style += key + ':' + val + ';';
    });

    return style;
}