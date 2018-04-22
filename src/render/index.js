/* eslint complexity: 0*/
/* eslint no-console: 0*/
'use strict';
const { getUiState } = require('../store');
const renderAllPanels = require('../renderAllPanels');
const renderFocus = require('../renderFocus');
const renderHelp = require('../renderHelp');
const renderHelpFocus = require('../renderHelpFocus');
const renderNotification = require('../renderNotification');

const isFocused = _uiState => {
	return _uiState.focus && _uiState.focus !== 'all' && _uiState.focus !== '';
};

/**
 * @returns {void}
 **/
function render() {
	const uiState = getUiState();

	if (uiState.notifications.length > 0) {
		renderNotification(render);
		return;
	}

	if (uiState.help) {
		if (isFocused(uiState)) {
			renderHelpFocus();
			return;
		}
		renderHelp();
		return;
	}

	if (!isFocused(uiState)) {
		renderAllPanels();
		return;
	}

	renderFocus();
}

module.exports = render;
