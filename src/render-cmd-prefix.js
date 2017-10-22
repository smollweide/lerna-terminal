'use strict';

const cmdPrefix = cmd => `lerna-terminal${cmd ? `/${cmd}` : ''}~$ `;
const { uiState } = require('./store');

/**
 * @description provides an string in terminal with cursor afterwards
 * @returns {void}
**/
function renderCmdPrefix() {
	if (typeof uiState.focus === 'string' && uiState.focus !== '' && uiState.focus !== 'all') {
		process.stdout.write(cmdPrefix(uiState.focus));
		return;
	}
	process.stdout.write(cmdPrefix());
}

module.exports = renderCmdPrefix;
