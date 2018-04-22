'use strict';
const { state } = require('../store');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @returns {void}
 **/
function cmdClear(packageName, render) {
	if (packageName && state[packageName] && state[packageName].log) {
		state[packageName].log = [];
		render();
		return;
	}
	Object.keys(state).forEach(key => {
		if (state[key].log) {
			state[key].log = [];
		}
	});
	render();
}

module.exports = cmdClear;
