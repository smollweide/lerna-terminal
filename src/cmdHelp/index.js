'use strict';

const resolve = require('../resolve');
const { uiState } = require('../store');

/**
 * @param {Function} render - the callback which should be a render function
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function cmdHelp(render, { _uiState }) {
	_uiState.focus = 'help';
	render();
}

module.exports = resolve(cmdHelp, { uiState });
