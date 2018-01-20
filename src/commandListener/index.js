'use strict';
const resolve = require('../resolve');

/**
 * @param {Function<string>} onCommandEntered - the callback function
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function commandListener(onCommandEntered, { _process }) {
	_process.stdin.setEncoding('utf8');
	_process.stdin.on('readable', () => {
		const chunk = _process.stdin.read();
		if (chunk !== null) {
			onCommandEntered(
				chunk
					.trim()
					.replace(/\n/g, '')
					.replace(/\t/g, '')
			);
		}
	});
}

module.exports = resolve(commandListener, { process });
module.exports.commandListener = commandListener;
