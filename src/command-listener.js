'use strict';

/**
 * @param {Function<string>} onCommandEntered - the callback function
 * @param {Object} diProcess - dependency injection process for tests
 * @returns {void}
**/
function commandListener(onCommandEntered, diProcess = process) {
	diProcess.stdin.setEncoding('utf8');
	diProcess.stdin.on('readable', () => {
		const chunk = diProcess.stdin.read();
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

module.exports = commandListener;
