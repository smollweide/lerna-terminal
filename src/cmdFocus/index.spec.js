/* global jest */
/* eslint global-require: 0*/

describe('cmdFocus', () => {
	it('focus defined package', done => {
		jest.mock('../store', () => {
			return {
				state: {},
				uiState: {
					focus: 'all',
					help: false,
				},
				provideStore: jest.fn(),
			};
		});
		const { uiState } = require('../store');
		const cmdFocus = require('./index');
		expect(cmdFocus('utils', done)).toBe(undefined);
		expect(uiState.focus).toBe('utils');
		expect(uiState.help).toBe(false);
		jest.unmock('../store');
	});
});
