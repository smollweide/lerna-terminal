'use strict';
const { getUiState } = require('../store');

const cmdPrefix = cmd => `lerna-terminal${cmd ? `/${cmd}` : ''}~$ `;

/**
 * @description provides an string in terminal with cursor afterwards
 * @returns {void}
 **/
function renderCmdPrefix() {
	const uiState = getUiState();
	if (typeof uiState.focus === 'string' && uiState.focus !== '' && uiState.focus !== 'all') {
		return process.stdout.write(cmdPrefix(uiState.focus));
	}
	process.stdout.write(cmdPrefix());
}

module.exports = renderCmdPrefix;
