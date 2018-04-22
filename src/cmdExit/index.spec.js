/* global jest */
/* eslint global-require: 0*/
const cmdExit = require('./index');
const cmdHelp = require('../cmdHelp');
const cmdFocus = require('../cmdFocus');

jest.mock('../store', () => {
	return {
		state: {},
		uiState: {
			focus: 'utils',
			help: false,
		},
		provideStore: jest.fn(),
	};
});
const { uiState } = require('../store');

describe('cmdExit', () => {
	it('uiState.focus should be empty', done => {
		cmdExit(undefined, done);
		expect(uiState.focus).toBe('');
		expect(uiState.help).toBe(false);
	});
	it('uiState.help should be false in case of help mode', done => {
		cmdFocus('utils', () => {});
		cmdHelp(undefined, () => {});
		cmdExit(undefined, done);
		expect(uiState.focus).toBe('utils');
		expect(uiState.help).toBe(false);
	});
});
