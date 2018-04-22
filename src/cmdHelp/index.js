'use strict';
const { uiState } = require('../store');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @returns {void}
 **/
function cmdHelp(packageName, render) {
	uiState.help = true;
	render();
}

module.exports = cmdHelp;
