/* eslint complexity: 0*/
/* eslint no-console: 0*/
'use strict';
const { uiState } = require('./store');
const renderAllPanels = require('./render-all-panels');
const renderFocus = require('./render-focus');
const renderHelp = require('./render-help');

/**
 * @returns {void}
**/
function render() {
	if (uiState.focus === 'all' || !uiState.focus) {
		renderAllPanels();
		return;
	}
	if (uiState.focus === 'help') {
		renderHelp();
		return;
	}

	renderFocus();
}

module.exports = render;
