/* eslint complexity: 0*/
/* eslint no-console: 0*/
'use strict';
const resolve = require('../resolve');
const { uiState } = require('../store');
const renderAllPanels = require('../renderAllPanels');
const renderFocus = require('../renderFocus');
const renderHelp = require('../renderHelp');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function render({ _uiState, _renderAllPanels, _renderHelp, _renderFocus }) {
	if (_uiState.focus === 'all' || !_uiState.focus) {
		_renderAllPanels();
		return;
	}
	if (_uiState.focus === 'help') {
		_renderHelp();
		return;
	}

	_renderFocus();
}

module.exports = resolve(render, { uiState, renderAllPanels, renderHelp, renderFocus });
module.exports.render = render;
