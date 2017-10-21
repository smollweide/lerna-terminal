/* eslint no-console: 0*/
'use strict';
const chalk = require('chalk');
const renderCmdPrefix = require('./render-cmd-prefix');
const renderClear = require('./render-clear');

/**
 * @returns {void}
**/
function renderHelp() {
	renderClear();
	console.log('');
	console.log(chalk.bold('Help'));
	renderCmdPrefix();
}

module.exports = renderHelp;
