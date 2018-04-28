'use strict';
const keypress = require('keypress');
const { getUiState } = require('../store');

keypress(process.stdin);

let buffer = '';
const history = [];
let currentSelectedHistory = 0;

const onCtrlC = () => {
	buffer = '';
	process.exit();
};

const onBackspace = () => {
	buffer = buffer.substring(0, buffer.length - 1);
	getUiState().onChange(buffer);
};

const onUp = () => {
	const uiState = getUiState();
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
};

const onDown = () => {
	const uiState = getUiState();
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
};

const onReturn = onCommandEntered => {
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
	getUiState().onChange('');
};

const onRecieveLetter = letter => {
	if (!letter) {
		return;
	}
	buffer += letter;
	getUiState().onChange(buffer);
};

const keyNameMap = {
	backspace: onBackspace,
	up: onUp,
	down: onDown,
	return: onReturn,
};

/**
 * @param {Function<string>} onCommandEntered - the callback function
 * @returns {void}
 **/
function commandListener(onCommandEntered) {
	process.stdin.setEncoding('utf8');
	process.stdin.setRawMode(true);
	process.stdin.on('keypress', (letter, key) => {
		if (!key && letter) {
			onRecieveLetter(letter);
			return;
		}

		if (key) {
			if (key.ctrl && key.name) {
				onCtrlC();
				return;
			}

			/* istanbul ignore else case */
			if (keyNameMap[key.name]) {
				keyNameMap[key.name](onCommandEntered);
				return;
			}
		}
		onRecieveLetter(letter);
	});
	process.stdin.resume();
}

module.exports = commandListener;
