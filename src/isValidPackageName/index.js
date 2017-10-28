'use strict';
const resolve = require('../resolve');
const { state } = require('../store');

/**
 * @param {string} packageName - the name of the package
 * @param {Object} di - dependency injection
 * @returns {boolean} returns true if packageName is valid
**/
function isValidPackageName(packageName, { _state }) {
	return Boolean(
		_state[packageName] &&
			_state[packageName].terminal &&
			typeof _state[packageName].terminal.start === 'function' &&
			typeof _state[packageName].terminal.stop === 'function' &&
			Array.isArray(_state[packageName].log)
	);
}

module.exports = resolve(isValidPackageName, { state });
module.exports.isValidPackageName = isValidPackageName;
