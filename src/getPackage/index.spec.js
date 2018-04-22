/* global jest */
const getPackage = require('./index');

const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('path');

fs.realpathSync.mockImplementation(value => value);
fs.readFileSync.mockImplementation(() => '{ "test": true }');
path.join.mockImplementation(() => '/test/package.json');

describe('getPackage', () => {
	it('returns object', () => {
		expect(getPackage('/path/')).toEqual({ test: true });
	});
});
