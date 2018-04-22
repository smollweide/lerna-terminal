/**
 * @param {string} value - value string
 * @returns {string} - retruns the parsed value (\b, \t)
 **/
function stripTerminalString(value) {
	const result = value.split('\b');
	if (result.length < 2) {
		return value;
	}
	return `${result[0]}${result[result.length - 1]}`;
}

module.exports = stripTerminalString;
