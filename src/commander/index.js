'use strict';
const program = require('commander');
const packageData = require('../../package.json');

/**
 * @returns {void}
 **/
function runCommander() {
	program
		.version(packageData.version)
		.arguments('<scriptNames>')
		.action(scriptNames => {
			program.scripts = scriptNames.split(',');
		})
		.option('-i, --ignoredPackages [string]', 'Add packages which should be ignored')
		.option('-f, --focus [string]', 'Focus one subterminal initially')
		.option('-t, --theme [string]', 'Define theme (default, minimal, massive)')
		.option('-r, --root', 'Run given scriptName also in root package')
		.parse(process.argv);

	/* istanbul ignore next */
	if (!program.scripts || !Array.isArray(program.scripts) || program.scripts.length < 1) {
		throw new Error('--script is required');
	}
}

/**
 * @returns {Object} programm
 **/
function getProgram() {
	return program;
}

module.exports = {
	runCommander,
	program,
	getProgram,
	_runCommander: runCommander,
};
