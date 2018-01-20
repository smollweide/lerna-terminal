'use strict';

/**
 * @param {number} length - the length ot the array
 * @param {string|number|Array|Object|Function} value - the value with which the array should be filled
 * @returns {void}
 **/
function getFilledArray(length = 10, value = '') {
	return Array(...Array(length)).map(() => {
		if (Array.isArray(value)) {
			return value.concat([]);
		}
		if (typeof value === 'object') {
			return Object.assign({}, value);
		}
		return value;
	});
}

module.exports = getFilledArray;
