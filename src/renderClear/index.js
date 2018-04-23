/* eslint no-console: 0*/
'use strict';

/**
 * @description clears the terminal
 * @returns {void}
 **/
function renderClear() {
	// clear console
	process.stdout.write('\x1Bc');
}

module.exports = renderClear;
