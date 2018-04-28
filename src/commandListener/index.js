'use strict';
const keypress = require('keypress');
const { getUiState } = require('../store');

keypress(process.stdin);

let buffer = '';
const history = [];
let currentSelectedHistory = 0;

/**
 * @param {Function<string>} onCommandEntered - the callback function
 * @returns {void}
 **/
function commandListener(onCommandEntered) {
	const uiState = getUiState();

	process.stdin.setEncoding('utf8');
	process.stdin.setRawMode(true);
	process.stdin.on('keypress', (letter, key) => {
		if (key && key.ctrl && key.name === 'c') {
			buffer = '';
			process.exit();
		} else if (key && key.name === 'backspace') {
			buffer = buffer.substring(0, buffer.length - 1);
			uiState.onChange(buffer);
		} else if (key && key.name === 'up') {
			if (history[currentSelectedHistory]) {
				buffer = history[currentSelectedHistory];
				uiState.onChange(buffer);
			} else {
				buffer = '';
				uiState.onChange(buffer);
			}

			if (currentSelectedHistory >= history.length) {
				currentSelectedHistory = 0;
			} else {
				currentSelectedHistory += 1;
			}
		} else if (key && key.name === 'down') {
			if (currentSelectedHistory >= history.length - 1) {
				currentSelectedHistory = history.length - 2;
			} else if (currentSelectedHistory <= -1) {
				currentSelectedHistory = -1;
			} else {
				currentSelectedHistory -= 1;
			}

			if (history[currentSelectedHistory]) {
				buffer = history[currentSelectedHistory];
				uiState.onChange(buffer);
			} else {
				buffer = '';
				uiState.onChange(buffer);
			}
		} else if (key && key.name === 'return') {
			if (buffer.length > 0) {
				onCommandEntered(
					buffer
						.trim()
						.replace(/\n/g, '')
						.replace(/\t/g, '')
				);
				history.reverse();
				history.push(buffer);
				history.reverse();
			}
			buffer = '';
			currentSelectedHistory = 0;
			uiState.onChange('');
		} else if (letter) {
			buffer += letter;
			uiState.onChange(buffer);
		}
	});
	process.stdin.resume();
}

module.exports = commandListener;
