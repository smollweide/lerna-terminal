#!/usr/bin/env node
/* eslint complexity: 0*/
'use strict';

// TODOS
// - terminal title
// - don't ignore main script
// - execute command on childProcess
//   -> lerna-terminal~$ cmd utils p (jest)
//   -> focused lerna-terminal~$ p (jest)
// - change cmd prefix in focus, help ...
//   -> help = lerna-terminal(help)~$
//   -> focused = lerna-terminal(utils)~$
// - generic usage

const { runCommander } = require('./commander');
const { resizeListener } = require('./get-dimensions');
const { provideStore } = require('./store');
const commandListener = require('./command-listener');
const cmdStart = require('./cmd-start');
const cmdStop = require('./cmd-stop');
const cmdClear = require('./cmd-clear');
const cmdFocus = require('./cmd-focus');
const cmdHelp = require('./cmd-help');
const runNpmScripts = require('./run-npm-scripts');
const render = require('./render');

runCommander();
provideStore();
runNpmScripts();
resizeListener(render);
commandListener(cmd => {
	if (cmd.search(/^help/) >= 0) {
		cmdHelp(render);
		return;
	}

	if (cmd.search(/^focus/) >= 0) {
		cmdFocus(cmd.replace(/^focus/, '').trim(), render);
		return;
	}

	if (cmd.search(/^clear/) >= 0) {
		cmdClear(cmd.replace(/^clear/, '').trim(), render);
		return;
	}

	if (cmd.search(/^stop/) >= 0) {
		cmdStop(cmd.replace(/^stop/, '').trim(), render);
		return;
	}

	if (cmd.search(/^start/) >= 0) {
		cmdStart(cmd.replace(/^start/, '').trim(), render);
		return;
	}
});
