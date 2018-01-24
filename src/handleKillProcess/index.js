'use strict';
const resolve = require('../resolve');
const cmdStop = require('../cmdStop');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function handleKillProcess({ _process, _cmdStop }) {
	const handleKill = () => _cmdStop(undefined, _process.exit);

	// catch ctrl-c
	_process.on('SIGINT', handleKill);
	// catch kill
	_process.on('SIGTERM', handleKill);
}

module.exports = resolve(handleKillProcess, {
	process,
	cmdStop,
});
module.exports.handleKillProcess = handleKillProcess;
