/* eslint no-console: 0*/
/* eslint complexity: 0*/
'use strict';

const path = require('path');
const resolve = require('../resolve');
const getScriptCommands = require('../getScriptCommands');
const isIgnoredPackage = require('../isIgnoredPackage');
const runNpmScript = require('../runNpmScript');
const { getText } = require('../getTerminalPanel');
const { program } = require('../commander');
const { state } = require('../store');
const render = require('../render');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function runNpmScripts({
	_getScriptCommands,
	_program,
	_path,
	_isIgnoredPackage,
	_state,
	_runNpmScript,
	_getText,
	_render,
}) {
	const commands = _getScriptCommands();

	if (!commands[_program.script]) {
		throw new Error("the given script wasn't found!");
	}

	Object.keys(commands[_program.script]).forEach(index => {
		const packagePath = commands[_program.script][index];
		const packageName = _path.basename(packagePath);
		if (_isIgnoredPackage(packagePath, _program.ignoredPackages)) {
			return;
		}
		_state[packageName] = {
			log: [],
		};
		_state[packageName].terminal = _runNpmScript({
			scriptName: _program.script,
			packagePath,
			onRecieve(text) {
				_state[packageName].log = _state[packageName].log.concat(_getText(text.split('\n'), 'msg'));
				_render();
			},
			onError(text) {
				_state[packageName].log = _state[packageName].log.concat(_getText(text.split('\n'), 'error'));
				_render();
			},
			onExit() {
				_state[packageName].log = _state[packageName].log.concat(_getText(`stop: ${packageName}`, 'error'));
				_render();
			},
		});
	});
}

module.exports = resolve(runNpmScripts, {
	getScriptCommands,
	program,
	path,
	isIgnoredPackage,
	state,
	runNpmScript,
	getText,
	render,
});
module.exports.runNpmScripts = runNpmScripts;
