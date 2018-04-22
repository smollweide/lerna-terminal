const stringLengthRaw = require('string-length');

/**
 * @description run the length of the string
 * @param {string} value - the incoming string
 * @returns {number} length - the "real" string length
 **/
function stringLength(value) {
	return stringLengthRaw(value);
}

module.exports = stringLength;
