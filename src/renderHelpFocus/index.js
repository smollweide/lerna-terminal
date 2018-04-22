/* eslint no-console: 0*/
'use strict';
const chalk = require('chalk');
const renderCmdPrefix = require('../renderCmdPrefix');
const renderClear = require('../renderClear');

/**
 * @returns {void}
 **/
function renderHelpFocus() {
	renderClear();
	console.log('');
	console.log(chalk.bold('Help'));
	console.log();
	console.log(`  ${chalk.bold('Usage')}`);
	console.log(`    lerna-terminal~$ [command]`);
	console.log();
	console.log(`  ${chalk.bold('Commands')}`);
	console.log(`    [string]          On Enter the given string will be executed in child process`);
	console.log(`    clear             Clear focused terminal panel`);
	console.log(`    start             Start (or restart) the npm script (see Usage) in focused terminal panel`);
	console.log(`    stop              Stops the npm script (see Usage) in focused terminal panel`);
	console.log(`    exit              Leave current child process and displays all terminal panels`);
	console.log();
	console.log();
	renderCmdPrefix();
}

module.exports = renderHelpFocus;
