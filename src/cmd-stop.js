'use strict';

const { state } = require('./store');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @param {Object} diState - dependency injection state for tests
 * @returns {void}
**/
function cmdStop(packageName, render, diState = state) {
	if (
		packageName &&
		diState[packageName] &&
		diState[packageName].terminal &&
		typeof diState[packageName].terminal.stop === 'function'
	) {
		diState[packageName].terminal.stop();
		render();
		return;
	}

	Object.keys(diState).forEach(key => {
		if (diState[key].terminal && typeof diState[key].terminal.stop === 'function') {
			diState[key].terminal.stop();
		}
	});
	render();
}

module.exports = cmdStop;
