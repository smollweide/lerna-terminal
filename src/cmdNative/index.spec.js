/* global jest */
/* eslint global-require: 0*/
const cmdNative = require('./index');

jest.mock('../store', () => ({
	state: {
		test: {
			terminal: {
				execute() {},
			},
		},
		testInvalid: {},
	},
	uiState: { notifications: [] },
}));
const { state, uiState } = require('../store');

describe('cmdNative', () => {
	it('invalid because of missing cmd', () => {
		cmdNative(undefined, 'packageName', () => {});
		expect(uiState.notifications.length).toBe(1);
	});
	it('invalid because of missing packageName', () => {
		cmdNative('npm run start', undefined, () => {});
		expect(uiState.notifications.length).toBe(1);
	});
	it('invalid because of missing render function', () => {
		cmdNative('npm run start', 'testInvalid', undefined);
		expect(uiState.notifications.length).toBe(1);
	});
	it('invalid because of missing execute function', () => {
		cmdNative('npm run start', 'testInvalid', () => {});
		expect(uiState.notifications.length).toBe(2);
	});
	it('execute cmd', () => {
		const spy = jest.spyOn(state.test.terminal, 'execute');
		cmdNative('npm run start', 'test', () => {});
		expect(spy).toHaveBeenCalled();
		spy.mockReset();
		spy.mockRestore();
	});
});
