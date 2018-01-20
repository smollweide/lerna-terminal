'use strict';
const resolve = require('../resolve');
const { uiState } = require('../store');

const cmdPrefix = cmd => `lerna-terminal${cmd ? `/${cmd}` : ''}~$ `;

/**
 * @description provides an string in terminal with cursor afterwards
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function renderCmdPrefix({ _uiState, _write }) {
	if (typeof _uiState.focus === 'string' && _uiState.focus !== '' && _uiState.focus !== 'all') {
		/* istanbul ignore next */
		if (_write) {
			_write(cmdPrefix(_uiState.focus));
			return;
		}
		/* istanbul ignore next */
		return process.stdout.write(cmdPrefix(_uiState.focus));
	}

	/* istanbul ignore next */
	if (_write) {
		_write(cmdPrefix());
		return;
	}

	/* istanbul ignore next */
	process.stdout.write(cmdPrefix());
}

module.exports = resolve(renderCmdPrefix, { uiState });
module.exports.renderCmdPrefix = renderCmdPrefix;
