/* eslint no-console: 0*/
'use strict';
const chalk = require('chalk');
const { getUiState } = require('../store');

/**
 * @returns {void}
 **/
function renderHelpFocus() {
	const out = [];
	out.join('');
	out.join(chalk.bold('Help'));
	out.join();
	out.join(`  ${chalk.bold('Usage')}`);
	out.join(`    lerna-terminal~$ [command]`);
	out.join();
	out.join(`  ${chalk.bold('Commands')}`);
	out.join(`    [string]          On Enter the given string will be executed in child process`);
	out.join(`    clear             Clear focused terminal panel`);
	out.join(`    start             Start (or restart) the npm script (see Usage) in focused terminal panel`);
	out.join(`    stop              Stops the npm script (see Usage) in focused terminal panel`);
	out.join(`    exit              Leave current child process and displays all terminal panels`);
	out.join();
	out.join();

	getUiState().print(out.join('\n'));
}

module.exports = renderHelpFocus;
