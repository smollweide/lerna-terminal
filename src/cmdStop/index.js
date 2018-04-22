'use strict';
const { state, uiState } = require('../store');

const isValidStopFunction = (_state, packageName) => {
	return Boolean(
		_state[packageName] && _state[packageName].terminal && typeof _state[packageName].terminal.stop === 'function'
	);
};

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function cmdStop(packageName, render) {
	// if stop <packageName> try to stop script
	if (packageName) {
		if (isValidStopFunction(state, packageName)) {
			state[packageName].terminal.stop();
			render();
		}
		return;
	}

	// if focused run stop just for focused package
	if (uiState.focus && uiState.focus !== 'all' && uiState.focus !== '') {
		if (isValidStopFunction(state, uiState.focus)) {
			state[uiState.focus].terminal.stop();
			render();
		}
		return;
	}

	// if split screen view stop all scripts
	Object.keys(state).forEach(key => {
		if (isValidStopFunction(state, key)) {
			state[key].terminal.stop();
		}
	});
	render();
}

module.exports = cmdStop;
module.exports.isValidStopFunction = isValidStopFunction;
