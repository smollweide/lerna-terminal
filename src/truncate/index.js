'use strict';

/**
 * @param {string} value - the string which should be truncated
 * @param {number} maxLength - how long can the string be before truncate
 * @returns {string} - returns the truncated string
 **/
function truncate(value, maxLength) {
	if (value.length <= maxLength) {
		return value;
	}
	const subString = value.substr(0, maxLength - 4);
	return `${subString}...`;
}

module.exports = truncate;
