'use strict';

const { state } = require('./store');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @param {Object} diState - dependency injection state for tests
 * @returns {void}
**/
function cmdClear(packageName, render, diState = state) {
	if (packageName && diState[packageName] && diState[packageName].log) {
		diState[packageName].log = [];
		render();
		return;
	}
	Object.keys(diState).forEach(key => {
		if (diState[key].log) {
			diState[key].log = [];
		}
	});
	render();
}

module.exports = cmdClear;
