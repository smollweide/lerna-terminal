/* eslint no-console: 0*/
'use strict';
const chalk = require('chalk');
const renderCmdPrefix = require('../renderCmdPrefix');
const renderClear = require('../renderClear');

/**
 * @returns {void}
 **/
function renderHelp() {
	renderClear();
	console.log('');
	console.log(chalk.bold('Help'));
	console.log();
	console.log(`  ${chalk.bold('Usage')}`);
	console.log(`    lerna-terminal~$ [command]`);
	console.log();
	console.log(`  ${chalk.bold('Commands')}`);
	console.log(`    [string]          Focus one terminal panel and update current pwd`);
	console.log(`    focus             Leave focused mode (child process) and displays all terminal panels`);
	console.log(`    focus [string]    Focus one terminal panel and update current pwd`);
	console.log(`    clear             Clear all terminal panels`);
	console.log(`    clear [string]    Clear one terminal panel`);
	console.log(`    start             Start (or restart) the npm script (see Usage) in all terminal panels`);
	console.log(`    start [string]    Start (or restart) the npm script (see Usage) in one terminal panels`);
	console.log(`    stop              Stops the npm script (see Usage) in all terminal panels`);
	console.log(`    stop [string]     Stops the npm script (see Usage) in one terminal panels`);
	console.log(`    exit              Leave current child process and displays all terminal panels`);
	console.log();
	console.log();
	renderCmdPrefix();
}

module.exports = renderHelp;
