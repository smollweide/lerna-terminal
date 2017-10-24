/* eslint complexity: 0*/
/* eslint no-console: 0*/
'use strict';
const resolveDependency = require('./resolve-dependency');
const { uiState } = require('./store');
const renderAllPanels = require('./render-all-panels');
const renderFocus = require('./render-focus');
const renderHelp = require('./render-help');

const _render = ({ _uiState, _renderAllPanels, _renderHelp, _renderFocus }) => {
	if (_uiState.focus === 'all' || !_uiState.focus) {
		_renderAllPanels();
		return;
	}
	if (_uiState.focus === 'help') {
		_renderHelp();
		return;
	}

	_renderFocus();
};

/**
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function render(di) {
	_render(
		Object.assign(
			resolveDependency(di, 'uiState', uiState),
			resolveDependency(di, 'renderAllPanels', renderAllPanels),
			resolveDependency(di, 'renderHelp', renderHelp),
			resolveDependency(di, 'renderFocus', renderFocus)
		)
	);
}

module.exports = render;
