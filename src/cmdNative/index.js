'use strict';
const resolve = require('../resolve');

const { state } = require('../store');

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @param {Object} ui - dependency injection
 * @returns {void}
**/
function cmdNative(packageName, render) {
	render();
}

module.exports = resolve(cmdNative, { state });
module.exports.cmdNative = cmdNative;
