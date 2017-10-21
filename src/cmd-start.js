'use strict';

const { state } = require('./store');
const cmdClear = require('./cmd-clear');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @param {Object} diState - dependency injection state for tests
 * @returns {void}
**/
function cmdStart(packageName, render, diState = state) {
	if (
		packageName &&
		diState[packageName] &&
		diState[packageName].terminal &&
		typeof diState[packageName].terminal.start === 'function'
	) {
		cmdClear(packageName, render);
		diState[packageName].terminal = diState[packageName].terminal.start();
		return;
	}

	cmdClear(undefined, render);
	Object.keys(diState).forEach(key => {
		if (diState[key].terminal && typeof diState[key].terminal.start === 'function') {
			diState[key].terminal = diState[key].terminal.start();
		}
	});
}

module.exports = cmdStart;
