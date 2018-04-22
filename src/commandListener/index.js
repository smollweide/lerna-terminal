'use strict';

/**
 * @param {Function<string>} onCommandEntered - the callback function
 * @returns {void}
 **/
function commandListener(onCommandEntered) {
	process.stdin.setEncoding('utf8');
	process.stdin.on('readable', () => {
		const chunk = process.stdin.read();
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
