/**
 * Ripple wave animation helpers
 * @refs -> https://github.com/Dogfalo/materialize/blob/master/js/waves.js
 */

import { map } from 'lodash';

// Find exact position of element
export function isWindow(obj) {
    return obj !== null && obj === obj.window;
}

export function getWindow(el) {
    return isWindow(el) ? el : el.nodeType === 9 && el.defaultView;
}

export function offset(el) {
    let docElem, win,
        box = {top: 0, left: 0},
        doc = el && el.ownerDocument;

    docElem = doc.documentElement;

    if (typeof el.getBoundingClientRect !== typeof undefined) {
        box = el.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
}

export function convertStyle(obj) {
    let style = '';

    map(obj, (val, key) => {
        style += `${key}:${val};`;
    });

    return style;
}