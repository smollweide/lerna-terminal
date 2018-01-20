'use strict';
const program = require('commander');
const resolve = require('../resolve');
const packageData = require('../../package.json');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function runCommander({ _program, _process, _packageData }) {
	_program
		.version(_packageData.version)
		.arguments('<scriptName>')
		.action(scriptName => {
			_program.script = scriptName;
		})
		.option('-i, --ignoredPackages [string]', 'Add packages which should be ignored')
		.option('-f, --focus [string]', 'Focus one subterminal initially')
		.option('-t, --theme [string]', 'Define theme (default, minimal, massive)')
		.option('-r, --root', 'Run given scriptName also in root package')
		.parse(_process.argv);

	/* istanbul ignore next */
	if (!_program.script) {
		throw new Error('--script is required');
	}
}

module.exports = {
	runCommander: resolve(runCommander, { program, process, packageData }),
	program,
	_runCommander: runCommander,
};
