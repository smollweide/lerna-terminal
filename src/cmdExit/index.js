'use strict';
const resolve = require('../resolve');

const { uiState } = require('../store');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @param {Object} ui - dependency injection
 * @returns {void}
 **/
function cmdExit(packageName, render, { _uiState }) {
	if (_uiState.help) {
		_uiState.help = false;
	} else {
		_uiState.focus = '';
	}
	render();
}

module.exports = resolve(cmdExit, { uiState });
module.exports.cmdExit = cmdExit;
