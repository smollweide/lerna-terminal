'use strict';
const { uiState } = require('../store');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @returns {void}
 **/
function cmdExit(packageName, render) {
	if (uiState.help) {
		uiState.help = false;
	} else {
		uiState.focus = '';
	}
	render();
}

module.exports = cmdExit;
