/* global jest */
const getScriptCommands = require('./index');
const getLernaPackages = require('../getLernaPackages');
const getPackage = require('../getPackage');
const { getProgram } = require('../commander');
const fs = require('fs');

jest.mock('fs');
jest.mock('../commander');
jest.mock('../getPackage');
jest.mock('../getLernaPackages');

global.process = Object.assign(process, {
	cwd: () => '/test/',
});

fs.realpathSync.mockImplementation(value => value);
fs.readFileSync.mockImplementation(() => '{ "test": true }');
getLernaPackages.mockImplementation(onMatch => {
	onMatch('path-to-package-a');
	onMatch('path-to-package-b');
});

describe('getScriptCommands', () => {
	beforeEach(() => {
		getPackage.mockClear();
		getProgram.mockClear();
	});
	it('find scripts', () => {
		getPackage.mockImplementation(() => ({
			scripts: {
				start: 'npm run something',
			},
		}));
		getProgram.mockImplementation(() => ({
			root: false,
		}));
		expect(getScriptCommands()).toEqual({ start: ['path-to-package-a', 'path-to-package-b'] });
	});
	it('a package without scripts', () => {
		getPackage.mockImplementation(path => {
			return path === 'path-to-package-a'
				? {
						scripts: {
							start: 'npm run something',
						},
				  }
				: {};
		});
		getProgram.mockImplementation(() => ({
			root: false,
		}));
		expect(getScriptCommands()).toEqual({ start: ['path-to-package-a'] });
	});
	it('find scripts including root', () => {
		getPackage.mockImplementation(() => ({
			scripts: {
				start: 'npm run something',
			},
		}));
		getProgram.mockImplementation(() => ({
			root: true,
		}));
		expect(getScriptCommands()).toEqual({
			start: ['path-to-package-a', 'path-to-package-b', '/test/'],
		});
	});
});
