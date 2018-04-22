/* eslint no-console: 0*/
'use strict';
const renderCmdPrefix = require('../renderCmdPrefix');
const renderClear = require('../renderClear');
const { getState, getUiState } = require('../store');
const { getTerminal } = require('../getTerminalPanel');
const { getDimensions } = require('../getDimensions');
const renderAllPanels = require('../renderAllPanels');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function renderFocus() {
	const state = getState();
	const uiState = getUiState();
	const dimensions = getDimensions();
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
module.exports.renderFocus = renderFocus;
