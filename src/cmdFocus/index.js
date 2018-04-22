'use strict';

const { uiState } = require('../store');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @returns {void}
 **/
function cmdFocus(packageName, render) {
	uiState.focus = packageName;
	render();
}

module.exports = cmdFocus;
