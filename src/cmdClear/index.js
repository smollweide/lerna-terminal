'use strict';

const resolve = require('../resolve');
const { state } = require('../store');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function cmdClear(packageName, render, { _state }) {
	if (packageName && _state[packageName] && _state[packageName].log) {
		_state[packageName].log = [];
		render();
		return;
	}
	Object.keys(_state).forEach(key => {
		if (_state[key].log) {
			_state[key].log = [];
		}
	});
	render();
}

module.exports = resolve(cmdClear, { state });
