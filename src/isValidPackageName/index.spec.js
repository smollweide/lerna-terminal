/* global jest */
const isValidPackageName = require('./index');
const { getState } = require('../store');

jest.mock('../store');

getState.mockImplementation(() => ({
	utils: {
		log: [123],
		terminal: { start() {}, stop() {} },
	},
	ui: {
		log: ['started'],
	},
	dateTime: {},
}));

describe('isValidPackageName', () => {
	it('true', () => {
		expect(isValidPackageName('utils')).toBe(true);
	});
	it('false', () => {
		expect(isValidPackageName('ui')).toBe(false);
		expect(isValidPackageName('dateTime')).toBe(false);
	});
});
