import { pull, filter, uniq } from 'lodash';

/**
 * Add new CSS class to element
 * 
 * @params
 * - {element} el 	: Target element
 * - {array/string} newClass 	: New CSS class(es)
 */
export function addClass(el, newClass) {
	let classes = el.className.split(' ');

	if (typeof newClass === 'string') {
		classes.push(newClass);
	}
	else {
		classes = classes.concat(newClass);
	}

	el.className = filter(uniq(classes), val => val !== "").join(' ');
}


/**
 * Remove CSS class from element
 * 
 * @params
 * - {element} el 	: Target element
 * - {array/string} oldClass 	: CSS class(es) to be removed
 */
export function removeClass(el, oldClass) {
	let classes = el.className.split(' ');

	pull(classes, oldClass);

	el.className = filter(uniq(classes), val => val !== "").join(' ');
}


/**
 * Check if element contains of a CSS class
 * 
 * @params
 * - {element} el 	: Target element
 * - {string} checkClass 	: CSS class to be checked
 */
export function hasClass(el, checkClass) {
    return (' ' + el.className + ' ').indexOf(' ' + checkClass + ' ') > -1;
}