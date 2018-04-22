/* global jest */
jest.mock('../store', () => {
	return {
		state: {
			utils: {
				log: [123],
			},
			ui: {
				log: ['started'],
			},
			dateTime: {},
		},
		uiState: {},
		provideStore: jest.fn(),
	};
});

const cmdClear = require('./index');
const store = require('../store');

describe('cmdClear', () => {
	it('execute without error', done => {
		expect(cmdClear('utils', done)).toBe(undefined);
	});
	it('clear defined package', done => {
		cmdClear('utils', done);
		expect(store.state.utils.log).toEqual([]);
	});
	it('try clear undefined package', done => {
		expect(cmdClear('utils2', done)).toBe(undefined);
	});
	it('clear all package', done => {
		cmdClear(undefined, done);
		expect(store.state.utils.log).toEqual([]);
		expect(store.state.ui.log).toEqual([]);
	});
});
