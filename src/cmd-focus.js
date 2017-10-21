'use strict';

const { uiState } = require('./store');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @param {Object} diUiState - dependency injection state for tests
 * @returns {void}
**/
function cmdFocus(packageName, render, diUiState = uiState) {
	diUiState.focus = packageName;
	render();
}

module.exports = cmdFocus;
