'use strict';
/* eslint require-jsdoc: 0*/
const { program } = require('../commander');

const cmdPrefix = cmd => `lerna-terminal${cmd ? `/${cmd}` : ''}~$ `;

const state = {};
const uiState = {
	prefix: cmdPrefix(''),
	buffer: '',
	entered: '',
	onChange(value) {
		this.entered = value;
		this.print(this.buffer);
	},
	print(value) {
		if (typeof this.focus === 'string' && this.focus !== '' && this.focus !== 'all') {
			this.prefix = cmdPrefix(this.focus);
		} else {
			this.prefix = cmdPrefix('');
		}
		this.buffer = value;
		/* istanbul ignore next */
		if (process.env.NODE_ENV !== 'ci' && process.env.NODE_ENV !== 'test') {
			process.stdout.write('\x1Bc');
		}
		process.stdout.write(value);
		process.stdout.write(this.prefix + this.entered);
	},
	clearBuffer() {
		this.buffer = '';
	},
	notifications: [],
	help: false,
};

/**
 * @description prepares the initial store
 * @returns {void}
 **/
function provideStore() {
	/* istanbul ignore next */
	uiState.focus = program.focus ? program.focus : 'all';
}

/**
 * @returns {Object} state
 **/
function getState() {
	return state;
}
/**
 * @returns {Object} uiState
 **/
function getUiState() {
	return uiState;
}

module.exports = { state, getState, uiState, getUiState, provideStore };
