/* eslint no-console: 0*/
'use strict';
const resolveDependency = require('./resolve-dependency');
const renderCmdPrefix = require('./render-cmd-prefix');
const renderClear = require('./render-clear');
const { state, uiState } = require('./store');
const { getTerminal } = require('./get-terminal-panel');
const { dimensions } = require('./get-dimensions');
const renderAllPanels = require('./render-all-panels');

const _renderFocus = ({ _state, _uiState, _dimensions, _log, _renderClear, _renderCmdPrefix, _renderAllPanels }) => {
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
};

/**
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function renderFocus(di) {
	_renderFocus(
		Object.assign(
			resolveDependency(di, 'state', state),
			resolveDependency(di, 'uiState', uiState),
			resolveDependency(di, 'dimensions', dimensions),
			resolveDependency(di, 'log', console.log),
			resolveDependency(di, 'renderClear', renderClear),
			resolveDependency(di, 'renderCmdPrefix', renderCmdPrefix),
			resolveDependency(di, 'renderAllPanels', renderAllPanels)
		)
	);
}

module.exports = renderFocus;
