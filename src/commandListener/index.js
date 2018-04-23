'use strict';
const keypress = require('keypress');
const getFilledArray = require('../getFilledArray');

keypress(process.stdin);

let buffer = '';

/**
 * @param {Function<string>} onCommandEntered - the callback function
 * @returns {void}
 **/
function commandListener(onCommandEntered) {
	process.stdin.setEncoding('utf8');
	process.stdin.setRawMode(true);

	process.stdin.on('keypress', (letter, key) => {
		if (key && key.ctrl && key.name === 'c') {
			buffer = '';
			process.exit();
		} else if (key && key.name === 'backspace') {
			process.stdout.write(getFilledArray(buffer.length, '\b').join(''));
			buffer = buffer.substring(0, buffer.length - 1);
			process.stdout.write(buffer);
		} else if (key && key.name === 'return') {
			if (buffer.length > 0) {
				onCommandEntered(
					buffer
						.trim()
						.replace(/\n/g, '')
						.replace(/\t/g, '')
				);
			}
			buffer = '';
		} else if (letter) {
			process.stdout.write(getFilledArray(buffer.length, '\b').join(''));
			buffer += letter;
			process.stdout.write(buffer);
		}
	});
	process.stdin.resume();
}

module.exports = commandListener;
