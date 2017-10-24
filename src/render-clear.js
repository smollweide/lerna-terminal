/* eslint no-console: 0*/
'use strict';
const resolveDependency = require('./resolve-dependency');

const _renderClear = ({ _log }) => {
	// clear console
	_log('\x1Bc');
};

/**
 * @description clears the terminal
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function renderClear(di) {
	_renderClear(Object.assign(resolveDependency(di, 'log', console.log)));
}

module.exports = renderClear;
