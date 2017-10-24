'use strict';

const program = require('commander');
const resolveDependency = require('./resolve-dependency');

const _runCommander = ({ _program }) => {
	_program
		.version('0.1.0')
		.option('-s, --script [string]', 'Define the script which should be executed')
		.option('-i, --ignoredPackages [string]', 'Add packages which should be ignored')
		.option('-f, --focus [string]', 'Focus one subterminal initially')
		.option('-t, --theme [string]', 'Define theme (default, minimal, massive)')
		.parse(process.argv);

	if (!_program.script) {
		throw new Error('--script is required');
	}
};

/**
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function runCommander(di) {
	_runCommander(Object.assign(resolveDependency(di, 'program', program)));
}

module.exports = { runCommander, program };
