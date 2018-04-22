'use strict';
const { state, uiState } = require('../store');
const cmdClear = require('../cmdClear');

const isValidStartFunction = (_state, packageName) => {
	return Boolean(
		_state[packageName] && _state[packageName].terminal && typeof _state[packageName].terminal.start === 'function'
	);
};

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @returns {void}
 **/
function cmdStart(packageName, render) {
	// if start <packageName> try to start script
	if (packageName) {
		if (isValidStartFunction(state, packageName)) {
			cmdClear(packageName, render);
			state[packageName].terminal = state[packageName].terminal.start();
		}
		return;
	}

	// if focused run start just for focused package
	if (uiState.focus && uiState.focus !== 'all' && uiState.focus !== '') {
		if (isValidStartFunction(state, uiState.focus)) {
			cmdClear(uiState.focus, render);
			state[uiState.focus].terminal = state[uiState.focus].terminal.start();
		}
		return;
	}

	// if split screen view start or restart all scripts
	cmdClear(undefined, render);
	Object.keys(state).forEach(key => {
		if (state[key].terminal && typeof state[key].terminal.start === 'function') {
			state[key].terminal = state[key].terminal.start();
		}
	});
}

module.exports = cmdStart;
module.exports.isValidStartFunction = isValidStartFunction;
