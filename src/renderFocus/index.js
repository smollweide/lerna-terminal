/* eslint no-console: 0*/
'use strict';
const resolve = require('../resolve');
const renderCmdPrefix = require('../renderCmdPrefix');
const renderClear = require('../renderClear');
const { state, uiState } = require('../store');
const { getTerminal } = require('../getTerminalPanel');
const { dimensions } = require('../getDimensions');
const renderAllPanels = require('../renderAllPanels');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function renderFocus({ _state, _uiState, _dimensions, _log, _renderClear, _renderCmdPrefix, _renderAllPanels }) {
	const panelWidth = parseInt(_dimensions.width, 10);
	const panelHeight = parseInt(_dimensions.height, 10) - 1;
	const currentState = Object.assign({}, _state);

	if (currentState[_uiState.focus]) {
		_renderClear();
		_log(getTerminal(panelWidth, panelHeight, _uiState.focus, currentState[_uiState.focus].log).join(''));
		_renderCmdPrefix();
		return;
	}

	_renderAllPanels();
}

module.exports = resolve(renderFocus, {
	state,
	uiState,
	dimensions,
	log: console.log,
	renderClear,
	renderCmdPrefix,
	renderAllPanels,
});
module.exports.renderFocus = renderFocus;
