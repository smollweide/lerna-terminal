'use strict';
const resolve = require('../resolve');
const { state, uiState } = require('../store');
const cmdClear = require('../cmdClear');

const isValidStartFunction = (_state, packageName) => {
	return (
		_state[packageName] && _state[packageName].terminal && typeof _state[packageName].terminal.start === 'function'
	);
};

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function cmdStart(packageName, render, { _state, _uiState, _cmdClear }) {
	// if start <packageName> try to start script
	if (packageName) {
		if (isValidStartFunction(_state, packageName)) {
			_cmdClear(packageName, render);
			_state[packageName].terminal = _state[packageName].terminal.start();
		}
		return;
	}

	// if focused run start just for focused package
	if (_uiState.focus && _uiState.focus !== 'all' && _uiState.focus !== '') {
		if (isValidStartFunction(_state, _uiState.focus)) {
			_cmdClear(_uiState.focus, render);
			_state[_uiState.focus].terminal = _state[_uiState.focus].terminal.start();
		}
		return;
	}

	// if split screen view start or restart all scripts
	_cmdClear(undefined, render);
	Object.keys(_state).forEach(key => {
		if (_state[key].terminal && typeof _state[key].terminal.start === 'function') {
			_state[key].terminal = _state[key].terminal.start();
		}
	});
}

module.exports = resolve(cmdStart, { state, uiState, cmdClear });
module.exports.cmdStart = cmdStart;
