'use strict';
const program = require('commander');
const resolve = require('../resolve');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function runCommander({ _program, _process }) {
	_program
		.option('-s, --script [string]', 'Define the script which should be executed')
		.option('-i, --ignoredPackages [string]', 'Add packages which should be ignored')
		.option('-f, --focus [string]', 'Focus one subterminal initially')
		.option('-t, --theme [string]', 'Define theme (default, minimal, massive)')
		.parse(_process.argv);

	if (!_program.script) {
		throw new Error('--script is required');
	}
}

module.exports = { runCommander: resolve(runCommander, { program, process }), program, _runCommander: runCommander };
