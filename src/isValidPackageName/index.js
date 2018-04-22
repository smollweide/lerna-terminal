'use strict';
const { getState } = require('../store');

/**
 * @param {string} packageName - the name of the package
 * @param {Object} di - dependency injection
 * @returns {boolean} returns true if packageName is valid
 **/
function isValidPackageName(packageName) {
	const state = getState();
	return Boolean(
		state[packageName] &&
			state[packageName].terminal &&
			typeof state[packageName].terminal.start === 'function' &&
			typeof state[packageName].terminal.stop === 'function' &&
			Array.isArray(state[packageName].log)
	);
}

module.exports = isValidPackageName;
