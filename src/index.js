#!/usr/bin/env node
/* eslint complexity: 0*/
'use strict';

const { runCommander } = require('./commander');
const { resizeListener } = require('./getDimensions');
const { provideStore } = require('./store');
const commandListener = require('./commandListener');
const runNpmScripts = require('./runNpmScripts');
const render = require('./render');
const executeCmd = require('./executeCmd');
const handleKillProcess = require('./handleKillProcess');

runCommander();
provideStore();
runNpmScripts();
resizeListener(render);
commandListener(executeCmd);
handleKillProcess();
