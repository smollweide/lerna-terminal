'use strict';

const program = require('commander');

/**
 * @param {Object} diProgramm - dependency injection program for tests
 * @returns {void}
**/
function runCommander(diProgramm = program) {
	diProgramm
		.version('0.1.0')
		.option('-s, --script [string]', 'Define the script which should be executed')
		.option('-i, --ignoredPackages [string]', 'Add packages which should be ignored')
		.option('-f, --focus [string]', 'Focus one subterminal initially')
		.option('-t, --theme [string]', 'Define theme (default, minimal, massive)')
		.parse(process.argv);

	if (!diProgramm.script) {
		throw new Error('--script is required');
	}
}

module.exports = { runCommander, program };
