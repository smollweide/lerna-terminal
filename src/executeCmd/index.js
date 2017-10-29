/* eslint complexity: 0*/
'use strict';
const resolve = require('../resolve');
const render = require('../render');
const getFocused = require('../getFocused');
const cmdStart = require('../cmdStart');
const cmdStop = require('../cmdStop');
const cmdClear = require('../cmdClear');
const cmdFocus = require('../cmdFocus');
const cmdHelp = require('../cmdHelp');
const cmdExit = require('../cmdExit');
const cmdNative = require('../cmdExit');
const isValidPackageName = require('../isValidPackageName');

const COMMANDS = {
	CLEAR: 'clear',
	FOCUS: 'focus',
	EXIT: 'exit',
	HELP: 'help',
	START: 'start',
	STOP: 'stop',
};

const isValidCmd = cmd => {
	return Boolean(Object.keys(COMMANDS).indexOf(cmd.toUpperCase()) >= 0);
};

/**
 * @param {string} cmd - the user entered command
 * @param {Object} di - dependencies
 * @returns {boolean} returns true if packageName is a part of packagePath
**/
function executeCmd(
	cmd,
	{
		_render,
		_getFocused,
		_cmdNative,
		_cmdStart,
		_cmdStop,
		_cmdClear,
		_cmdFocus,
		_cmdHelp,
		_cmdExit,
		_isValidPackageName,
	}
) {
	if (typeof cmd !== 'string' || cmd === '') {
		return;
	}

	const cmdSpl = cmd
		.trim()
		.replace(/\n|\t/g, '')
		.split(' ');

	const focusedPackageName = _getFocused();
	const _isValidCmd = isValidCmd(cmdSpl[0]);

	// focus shortcut
	if (!_isValidCmd && cmdSpl.length === 1 && _isValidPackageName(cmdSpl[0])) {
		_cmdFocus(cmdSpl[0], _render);
		return;
	}

	const COMMAND_EXCECUTE_MAP = {
		CLEAR: _cmdClear,
		FOCUS: _cmdFocus,
		EXIT: _cmdExit,
		HELP: _cmdHelp,
		START: _cmdStart,
		STOP: _cmdStop,
	};

	if (focusedPackageName) {
		// run native cmd on child_process for example 'npm run test' in case of a child_process is focused
		if (!_isValidCmd) {
			_cmdNative(focusedPackageName, _render);
			return;
		}

		// run cmd on child_process in case of a child_process is focused
		// lerna-terminal/utils~$ start
		COMMAND_EXCECUTE_MAP[cmdSpl[0].toUpperCase()](focusedPackageName, _render);
		return;
	}

	if (_isValidCmd) {
		// run cmd on all child_processes in case of not focused and without packageName in cmd
		// lerna-terminal~$ start
		if (cmdSpl.length === 1) {
			COMMAND_EXCECUTE_MAP[cmdSpl[0].toUpperCase()](undefined, _render);
			return;
		}

		// run cmd on given child_process (described with second argument)
		// lerna-terminal~$ start utils
		COMMAND_EXCECUTE_MAP[cmdSpl[0].toUpperCase()](cmdSpl[1], _render);
		return;
	}

	// invalid command will be ignored
}

module.exports = resolve(executeCmd, {
	render,
	getFocused,
	cmdNative,
	cmdStart,
	cmdStop,
	cmdClear,
	cmdFocus,
	cmdHelp,
	cmdExit,
	isValidPackageName,
});
module.exports.executeCmd = executeCmd;
