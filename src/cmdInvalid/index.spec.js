/* global jest */
/* eslint global-require: 0*/

describe('cmdInvalid', () => {
	it('add notification', done => {
		jest.mock('../store', () => ({
			notifications: [],
		}));
		const { uiState } = require('../store');
		const cmdInvalid = require('./index');
		cmdInvalid(done, 'test');
		expect(uiState.notifications[0].type).toBe('error');
		jest.unmock('../store');
	});
});
