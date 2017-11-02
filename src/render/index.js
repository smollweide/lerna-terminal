/* eslint complexity: 0*/
/* eslint no-console: 0*/
'use strict';
const resolve = require('../resolve');
const { uiState } = require('../store');
const renderAllPanels = require('../renderAllPanels');
const renderFocus = require('../renderFocus');
const renderHelp = require('../renderHelp');
const renderNotification = require('../renderNotification');

let _render;

/**
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function render({ _uiState, _renderAllPanels, _renderHelp, _renderFocus, _renderNotification }) {
	if (_uiState.notifications.length > 0) {
		_renderNotification(_render);
		return;
	}

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

_render = resolve(render, { uiState, renderAllPanels, renderHelp, renderFocus, renderNotification });

module.exports = _render;
module.exports.render = render;
