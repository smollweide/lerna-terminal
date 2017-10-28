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
function renderHelp({ _renderClear, _renderCmdPrefix, _log }) {
	_renderClear();
	_log('');
	_log(chalk.bold('Help'));
	_log();
	_log(`  ${chalk.bold('Usage')}`);
	_log(`    lerna-terminal~$ [command]`);
	_log();
	_log(`  ${chalk.bold('Commands')}`);
	_log(`    [string]          Focus one terminal panel and update current pwd`);
	_log(`    focus             Leave focused mode and displays all terminal panels`);
	_log(`    focus [string]    Focus one terminal panel and update current pwd`);
	_log(`    clear             Clear all terminal panels`);
	_log(`    clear [string]    Clear one terminal panel`);
	_log(`    start             Start (or restart) the npm script (see Usage) in all terminal panels`);
	_log(`    start [string]    Start (or restart) the npm script (see Usage) in one terminal panels`);
	_log(`    stop              Stops the npm script (see Usage) in all terminal panels`);
	_log(`    stop [string]     Stops the npm script (see Usage) in one terminal panels`);
	_log(`    exit              Leave current mode and displays all terminal panels`);
	_log();
	_log();
	_renderCmdPrefix();
}

module.exports = resolve(renderHelp, { renderClear, renderCmdPrefix, log: console.log });
module.exports.renderHelp = renderHelp;
