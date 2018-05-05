/* eslint no-console: 0*/
'use strict';
const { getState, getUiState } = require('../store');
const renderAllPanels = require('../renderAllPanels');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function renderFocus() {
	const state = getState();
	const uiState = getUiState();
	const currentState = Object.assign({}, state);

	if (currentState[uiState.focus]) {
		uiState.print(`${currentState[uiState.focus].log.join('\n')}\n\n`);
		return;
	}

	renderAllPanels();
}

module.exports = renderFocus;
module.exports.renderFocus = renderFocus;
