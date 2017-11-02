/* eslint complexity: 0*/
/* eslint no-console: 0*/
'use strict';
const resolve = require('../resolve');
const { uiState } = require('../store');
const renderAllPanels = require('../renderAllPanels');
const renderFocus = require('../renderFocus');
const renderHelp = require('../renderHelp');
const renderHelpFocus = require('../renderHelpFocus');
const renderNotification = require('../renderNotification');

let _render;

const isFocused = _uiState => {
	return _uiState.focus && _uiState.focus !== 'all' && _uiState.focus !== '';
};

/**
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function render({ _uiState, _renderAllPanels, _renderHelp, _renderHelpFocus, _renderFocus, _renderNotification }) {
	if (_uiState.notifications.length > 0) {
		_renderNotification(_render);
		return;
	}

	if (_uiState.help) {
		if (isFocused(_uiState)) {
			_renderHelpFocus();
			return;
		}
		_renderHelp();
		return;
	}

	if (!isFocused(_uiState)) {
		_renderAllPanels();
		return;
	}

	_renderFocus();
}

_render = resolve(render, { uiState, renderAllPanels, renderHelp, renderHelpFocus, renderFocus, renderNotification });

module.exports = _render;
module.exports.render = render;
