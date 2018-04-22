/* global jest */
/* eslint global-require: 0*/
const getFocused = require('./index');
const isValidPackageName = require('../isValidPackageName');
// const { uiState } = require('../store');
const cmdFocus = require('../cmdFocus');

// const uiState = {
// 	focus: 'utils',
// };

jest.mock('../isValidPackageName');
jest.mock('../store', () => {
	return {
		state: {},
		uiState: {
			focus: 'utils',
		},
	};
});

describe('getFocused', () => {
	beforeEach(() => {
		isValidPackageName.mockClear();
	});
	it('is not focused 1 -> undefined', () => {
		cmdFocus('', () => {});
		expect(getFocused()).toBe(undefined);
	});
	it('is not focused 2 -> undefined', () => {
		cmdFocus('', () => {});
		expect(getFocused()).toBe(undefined);
	});
	it('is not focused 3 -> undefined', () => {
		cmdFocus('all', () => {});
		expect(getFocused()).toBe(undefined);
	});
	it('is not focused because is not a valid packageName', () => {
		cmdFocus('sadasd', () => {});
		isValidPackageName.mockImplementation(() => false);
		expect(getFocused()).toBe(undefined);
	});
	it('is focused and returns name', () => {
		cmdFocus('utils', () => {});
		isValidPackageName.mockImplementation(() => true);
		expect(getFocused()).toBe('utils');
	});
});
