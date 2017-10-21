'use strict';

const { uiState } = require('./store');

/**
 * @param {Function} render - the callback which should be a render function
 * @param {Object} diUiState - dependency injection state for tests
 * @returns {void}
**/
function cmdHelp(render, diUiState = uiState) {
	diUiState.focus = 'help';
	render();
}

module.exports = cmdHelp;
