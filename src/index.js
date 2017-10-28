#!/usr/bin/env node
/* eslint complexity: 0*/
'use strict';

// TODOS
// - terminal title
// - don't ignore main script
// - execute command on childProcess
//   -> lerna-terminal~$ cmd utils p (jest)
//   -> focused lerna-terminal~$ p (jest)
// - generic usage

const { runCommander } = require('./commander');
const { resizeListener } = require('./getDimensions');
const { provideStore } = require('./store');
const commandListener = require('./commandListener');
const runNpmScripts = require('./runNpmScripts');
const render = require('./render');
const executeCmd = require('./executeCmd');

runCommander();
provideStore();
runNpmScripts();
resizeListener(render);
commandListener(executeCmd);
