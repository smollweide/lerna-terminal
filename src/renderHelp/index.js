/* eslint no-console: 0*/
'use strict';
const chalk = require('chalk');
const { getUiState } = require('../store');

/**
 * @returns {void}
 **/
function renderHelp() {
	const out = [];
	out.join('');
	out.join(chalk.bold('Help'));
	out.join();
	out.join(`  ${chalk.bold('Usage')}`);
	out.join(`    lerna-terminal~$ [command]`);
	out.join();
	out.join(`  ${chalk.bold('Commands')}`);
	out.join(`    [string]          Focus one terminal panel and update current pwd`);
	out.join(`    focus             Leave focused mode (child process) and displays all terminal panels`);
	out.join(`    focus [string]    Focus one terminal panel and update current pwd`);
	out.join(`    clear             Clear all terminal panels`);
	out.join(`    clear [string]    Clear one terminal panel`);
	out.join(`    start             Start (or restart) the npm script (see Usage) in all terminal panels`);
	out.join(`    start [string]    Start (or restart) the npm script (see Usage) in one terminal panels`);
	out.join(`    stop              Stops the npm script (see Usage) in all terminal panels`);
	out.join(`    stop [string]     Stops the npm script (see Usage) in one terminal panels`);
	out.join(`    exit              Leave current child process and displays all terminal panels`);
	out.join();
	out.join();
	getUiState().print(out.join('\n'));
}

module.exports = renderHelp;
