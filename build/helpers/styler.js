'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.hasClass = hasClass;

var _lodash = require('lodash');

/**
 * Add new CSS class to element
 * 
 * @params
 * - {element} el 	: Target element
 * - {array/string} newClass 	: New CSS class(es)
 */
function addClass(el, newClass) {
  var classes = el.className.split(' ');

  if (typeof newClass === 'string') {
    classes.push(newClass);
  } else {
    classes = classes.concat(newClass);
  }

  el.className = (0, _lodash.filter)((0, _lodash.uniq)(classes), function (val) {
    return val !== "";
  }).join(' ');
}

/**
 * Remove CSS class from element
 * 
 * @params
 * - {element} el 	: Target element
 * - {array/string} oldClass 	: CSS class(es) to be removed
 */
function removeClass(el, oldClass) {
  var classes = el.className.split(' ');

  (0, _lodash.pull)(classes, oldClass);

  el.className = (0, _lodash.filter)((0, _lodash.uniq)(classes), function (val) {
    return val !== "";
  }).join(' ');
}

/**
 * Check if element contains of a CSS class
 * 
 * @params
 * - {element} el 	: Target element
 * - {string} checkClass 	: CSS class to be checked
 */
function hasClass(el, checkClass) {
  return (' ' + el.className + ' ').indexOf(' ' + checkClass + ' ') > -1;
}