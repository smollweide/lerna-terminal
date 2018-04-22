'use strict';

const { uiState } = require('../store');

/**
 * @param {Function} render - the callback which should be a render function
 * @param {string} cmd - the entered invalid command
 * @returns {void}
 **/
function cmdInvalid(render, cmd) {
	uiState.notifications.push({
		type: 'error',
		message: `The entered command "${cmd}" is invalid, please enter help for more informations.`,
		delay: 2000,
	});
	render();
}

module.exports = cmdInvalid;
