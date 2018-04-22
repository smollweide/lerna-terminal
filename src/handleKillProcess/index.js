'use strict';
const cmdStop = require('../cmdStop');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function handleKillProcess() {
	const handleKill = () => cmdStop(undefined, process.exit);

	// catch ctrl-c
	process.on('SIGINT', handleKill);
	// catch kill
	process.on('SIGTERM', handleKill);
}

module.exports = handleKillProcess;
