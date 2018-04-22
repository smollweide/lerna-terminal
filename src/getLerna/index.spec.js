/* global jest */
const getLerna = require('./index');
const fs = require('fs');

jest.mock('fs');

describe('getLerna', () => {
	beforeEach(() => {
		fs.realpathSync.mockClear();
		fs.readFileSync.mockClear();
	});
	it('returns object', () => {
		fs.realpathSync.mockImplementation(value => value);
		fs.readFileSync.mockImplementation(() => '{ "test": true }');
		expect(getLerna()).toEqual({ test: true });
	});
});
