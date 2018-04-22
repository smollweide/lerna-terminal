/* global jest */
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const getLerna = require('../getLerna');
const getLernaPackages = require('./index');

jest.mock('fs');
jest.mock('glob');
jest.mock('path');
jest.mock('../getLerna');

global.process = Object.assign(process, {
	cwd: () => '/test/',
});

fs.realpathSync.mockImplementation(value => value);
glob.sync.mockImplementation(() => ['/a/package.json', '/b/package.json']);
path.join.mockImplementation(() => '/test/');
getLerna.mockImplementation(() => ({
	packages: ['configs/*', 'packages/*/*'],
}));

describe('getLernaPackages', () => {
	it('returns packages', done => {
		expect(
			getLernaPackages(() => {
				done();
			})
		).toEqual(['/a', '/b', '/a', '/b']);
	});
	it('returns packages without onMatch', () => {
		expect(getLernaPackages(undefined)).toEqual(['/a', '/b', '/a', '/b']);
	});
});
