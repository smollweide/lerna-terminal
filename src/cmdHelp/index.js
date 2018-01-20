'use strict';

const resolve = require('../resolve');
const { uiState } = require('../store');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function cmdHelp(packageName, render, { _uiState }) {
	_uiState.help = true;
	render();
}

module.exports = resolve(cmdHelp, { uiState });
