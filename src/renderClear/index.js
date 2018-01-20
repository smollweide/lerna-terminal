/* eslint no-console: 0*/
'use strict';
const resolve = require('../resolve');

/**
 * @description clears the terminal
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function renderClear({ _log }) {
	// clear console
	_log('\x1Bc');
}

module.exports = resolve(renderClear, { log: console.log });
module.exports.renderClear = renderClear;
