/* eslint no-console: 0*/
/* eslint complexity: 0*/
'use strict';

const path = require('path');
const getScriptCommands = require('./get-script-commands');
const isIgnoredPackage = require('./is-ignored-package');
const runNpmScript = require('./run-npm-script');
const { getText } = require('./get-terminal-panel');
const { program } = require('./commander');
const { state } = require('./store');
const render = require('./render');

/**
 * @returns {void}
**/
function runNpmScripts() {
	const commands = getScriptCommands();

	if (!commands[program.script]) {
		throw new Error("the given script wasn't found!");
	}

	Object.keys(commands[program.script]).forEach(index => {
		const packagePath = commands[program.script][index];
		const packageName = path.basename(packagePath);
		if (isIgnoredPackage(packagePath, program.ignoredPackages)) {
			return;
		}
		state[packageName] = {
			log: [],
		};
		state[packageName].terminal = runNpmScript({
			scriptName: program.script,
			packagePath,
			onRecieve(text) {
				state[packageName].log = state[packageName].log.concat(getText(text.split('\n'), 'msg'));
				render();
			},
			onError(text) {
				state[packageName].log = state[packageName].log.concat(getText(text.split('\n'), 'error'));
				render();
			},
			onExit() {
				state[packageName].log = state[packageName].log.concat(getText(`stop: ${packageName}`, 'error'));
				render();
			},
		});
	});
}

module.exports = runNpmScripts;
