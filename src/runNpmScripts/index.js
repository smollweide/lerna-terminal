/* eslint no-console: 0*/
/* eslint complexity: 0*/
'use strict';

const path = require('path');
const getScriptCommands = require('../getScriptCommands');
const isIgnoredPackage = require('../isIgnoredPackage');
const runNpmScript = require('../runNpmScript');
const { getText } = require('../getTerminalPanel');
const { getProgram } = require('../commander');
const { getState } = require('../store');
const render = require('../render');

const parseText = text => {
	// eslint-disable-next-line
	return text.replace(new RegExp('\x1Bc', 'g'), '').split('\n');
};

/**
 * @returns {Object} state
 **/
function runNpmScripts() {
	const commands = getScriptCommands();
	const program = getProgram();
	const state = getState();

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
				if (text.search('\x1Bc') >= 0) {
					state[packageName].log = [];
				}
				state[packageName].log = state[packageName].log.concat(getText(parseText(text), 'msg'));
				render();
			},
			onError(text) {
				if (text.search('\x1Bc') >= 0) {
					state[packageName].log = [];
				}
				state[packageName].log = state[packageName].log.concat(getText(parseText(text), 'error'));
				render();
			},
			onExit() {
				state[packageName].log = state[packageName].log.concat(getText(`stop: ${packageName}`, 'error'));
				render();
			},
		});
	});

	return state;
}

module.exports = runNpmScripts;
