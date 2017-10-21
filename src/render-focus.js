/* eslint no-console: 0*/
'use strict';
const renderCmdPrefix = require('./render-cmd-prefix');
const renderClear = require('./render-clear');
const { state, uiState } = require('./store');
const { getTerminal } = require('./get-terminal-panel');
const { dimensions } = require('./get-dimensions');
const renderAllPanels = require('./render-all-panels');

/**
 * @returns {void}
**/
function renderFocus() {
	const panelWidth = parseInt(dimensions.width, 10);
	const panelHeight = parseInt(dimensions.height, 10) - 1;
	const currentState = Object.assign({}, state);

	if (currentState[uiState.focus]) {
		renderClear();
		console.log(getTerminal(panelWidth, panelHeight, uiState.focus, currentState[uiState.focus].log).join(''));
		renderCmdPrefix();
		return;
	}

	renderAllPanels();
}

module.exports = renderFocus;
