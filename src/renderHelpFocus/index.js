/* eslint no-console: 0*/
'use strict';
const chalk = require('chalk');
const resolve = require('../resolve');
const renderCmdPrefix = require('../renderCmdPrefix');
const renderClear = require('../renderClear');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function renderHelpFocus({ _renderClear, _renderCmdPrefix, _log }) {
	_renderClear();
	_log('');
	_log(chalk.bold('Help'));
	_log();
	_log(`  ${chalk.bold('Usage')}`);
	_log(`    lerna-terminal~$ [command]`);
	_log();
	_log(`  ${chalk.bold('Commands')}`);
	_log(`    [string]          On Enter the given string will be executed in child process`);
	_log(`    clear             Clear focused terminal panel`);
	_log(`    start             Start (or restart) the npm script (see Usage) in focused terminal panel`);
	_log(`    stop              Stops the npm script (see Usage) in focused terminal panel`);
	_log(`    exit              Leave current child process and displays all terminal panels`);
	_log();
	_log();
	_renderCmdPrefix();
}

module.exports = resolve(renderHelpFocus, { renderClear, renderCmdPrefix, log: console.log });
module.exports.renderHelp = renderHelpFocus;
