'use strict';
const path = require('path');
const keypress = require('keypress');
const chalk = require('chalk');
const { getUiState } = require('../store');
const getLernaPackages = require('../getLernaPackages');
const { getProgram } = require('../commander');
const getPackage = require('../getPackage');
const { COMMANDS } = require('../executeCmd');

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

const onTab = () => {
	const availablePackages = Object.values(COMMANDS);

	getLernaPackages(packagePath => {
		// eslint-disable-next-line
		const packageData = getPackage(packagePath);
		if (packageData && packageData.scripts && packageData.scripts[getProgram().script]) {
			availablePackages.push(path.basename(packagePath));
		}
	});

	const filteredPackages = availablePackages.filter(
		availablePackage => new RegExp(`^${buffer}`).exec(availablePackage) !== null
	);

	if (filteredPackages.length === 1) {
		buffer = filteredPackages[0];
		getUiState().onChange(filteredPackages[0]);
		return;
	}

	if (filteredPackages.length > 1) {
		const originalBuffer = buffer;
		buffer = `commands: ${chalk.blue(filteredPackages.join(', '))}`;
		getUiState().onChange(`commands: ${chalk.blue(filteredPackages.join(', '))}`);

		setTimeout(() => {
			buffer = originalBuffer;
			getUiState().onChange(originalBuffer);
		}, 1500);
	}
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
	tab: onTab,
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
