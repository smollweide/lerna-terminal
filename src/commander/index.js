'use strict';
const program = require('commander');
const packageData = require('../../package.json');

/**
 * @returns {void}
 **/
function runCommander() {
	program
		.version(packageData.version)
		.arguments('<scriptName>')
		.action(scriptName => {
			program.script = scriptName;
		})
		.option('-i, --ignoredPackages [string]', 'Add packages which should be ignored')
		.option('-f, --focus [string]', 'Focus one subterminal initially')
		.option('-t, --theme [string]', 'Define theme (default, minimal, massive)')
		.option('-r, --root', 'Run given scriptName also in root package')
		.parse(process.argv);

	/* istanbul ignore next */
	if (!program.script) {
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
