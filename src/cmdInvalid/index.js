'use strict';

const resolve = require('../resolve');
const { uiState } = require('../store');

/**
 * @param {Function} render - the callback which should be a render function
 * @param {string} cmd - the entered invalid command
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function cmdInvalid(render, cmd, { _uiState }) {
	_uiState.notifications.push({
		type: 'error',
		message: `The entered command "${cmd}" is invalid, please enter help for more informations.`,
		delay: 2000,
	});
	render();
}

module.exports = resolve(cmdInvalid, { uiState });
