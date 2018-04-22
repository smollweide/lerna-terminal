/* global jest */
/* eslint global-require: 0*/

describe('cmdHelp', () => {
	it('set help flag', done => {
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
		const cmdHelp = require('./index');
		cmdHelp('', done);
		expect(uiState.help).toBe(true);
		jest.unmock('../store');
	});
});
