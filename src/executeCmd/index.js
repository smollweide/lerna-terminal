/* eslint complexity: 0*/
'use strict';
const render = require('../render');
const getFocused = require('../getFocused');
const cmdStart = require('../cmdStart');
const cmdStop = require('../cmdStop');
const cmdClear = require('../cmdClear');
const cmdFocus = require('../cmdFocus');
const cmdHelp = require('../cmdHelp');
const cmdExit = require('../cmdExit');
const cmdNative = require('../cmdNative');
const cmdInvalid = require('../cmdInvalid');
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
 * @returns {boolean} returns true if packageName is a part of packagePath
 **/
function executeCmd(cmd) {
	if (typeof cmd !== 'string' || cmd === '') {
		return;
	}

	const cmdSpl = cmd
		.trim()
		.replace(/\n|\t/g, '')
		.split(' ');

	const focusedPackageName = getFocused();
	const _isValidCmd = isValidCmd(cmdSpl[0]);

	// focus shortcut
	if (!_isValidCmd && cmdSpl.length === 1 && isValidPackageName(cmdSpl[0])) {
		cmdFocus(cmdSpl[0], render);
		return;
	}

	const COMMAND_EXCECUTE_MAP = {
		CLEAR: cmdClear,
		FOCUS: cmdFocus,
		EXIT: cmdExit,
		HELP: cmdHelp,
		START: cmdStart,
		STOP: cmdStop,
	};

	if (focusedPackageName) {
		// run native cmd on child_process for example 'npm run test' in case of a child_process is focused
		if (!_isValidCmd) {
			cmdNative(cmd, focusedPackageName, render);
			return;
		}

		// run cmd on child_process in case of a child_process is focused
		// lerna-terminal/utils~$ start
		COMMAND_EXCECUTE_MAP[cmdSpl[0].toUpperCase()](focusedPackageName, render);
		return;
	}

	if (_isValidCmd) {
		// run cmd on all child_processes in case of not focused and without packageName in cmd
		// lerna-terminal~$ start
		if (cmdSpl.length === 1) {
			COMMAND_EXCECUTE_MAP[cmdSpl[0].toUpperCase()](undefined, render);
			return;
		}

		// run cmd on given child_process (described with second argument)
		// lerna-terminal~$ start utils
		COMMAND_EXCECUTE_MAP[cmdSpl[0].toUpperCase()](cmdSpl[1], render);
		return;
	}

	// invalid command will be ignored
	cmdInvalid(render, cmd);
}

module.exports = executeCmd;
module.exports.COMMANDS = COMMANDS;
