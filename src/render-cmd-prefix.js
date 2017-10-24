'use strict';
const resolveDependency = require('./resolve-dependency');
const { uiState } = require('./store');

const cmdPrefix = cmd => `lerna-terminal${cmd ? `/${cmd}` : ''}~$ `;

const _renderCmdPrefix = (di, { _uiState }) => {
	if (typeof _uiState.focus === 'string' && _uiState.focus !== '' && _uiState.focus !== 'all') {
		/* istanbul ignore next */
		if (di) {
			di.write(cmdPrefix(_uiState.focus));
			return;
		}
		/* istanbul ignore next */
		return process.stdout.write(cmdPrefix(_uiState.focus));
	}

	/* istanbul ignore next */
	if (di) {
		di.write(cmdPrefix());
		return;
	}

	/* istanbul ignore next */
	process.stdout.write(cmdPrefix());
};

/**
 * @description provides an string in terminal with cursor afterwards
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function renderCmdPrefix(di) {
	_renderCmdPrefix(di, Object.assign(resolveDependency(di, 'uiState', uiState)));
}

module.exports = renderCmdPrefix;
