const dcopy = require('deep-copy');
const resolve = require('../resolve');
const getScriptCommands = require('./index');

const defaults = {
	fs: {
		realpathSync: value => value,
		readFileSync: () => '{ "test": true }',
	},
	process: {
		cwd: () => '/test/',
	},
	getLernaPackages: onMatch => {
		onMatch('path-to-package-a');
		onMatch('path-to-package-b');
	},
	program: {
		root: false,
	},
};

const packageData = {
	scripts: {
		start: 'npm run something',
	},
};

describe('getScriptCommands', () => {
	it('find scripts', () => {
		const _packageData = dcopy(packageData);
		const _getScriptCommands = resolve(
			getScriptCommands,
			Object.assign(defaults, {
				getPackage: () => _packageData,
			})
		);
		expect(_getScriptCommands()).toEqual({ start: ['path-to-package-a', 'path-to-package-b'] });
	});
	it('a package without scripts', () => {
		const _packageData = dcopy(packageData);
		const _getScriptCommands = resolve(
			getScriptCommands,
			Object.assign(defaults, {
				getPackage: path => {
					return path === 'path-to-package-a' ? _packageData : {};
				},
			})
		);
		expect(_getScriptCommands()).toEqual({ start: ['path-to-package-a'] });
	});
	it('find scripts including root', () => {
		const _packageData = dcopy(packageData);
		const _getScriptCommands = resolve(
			getScriptCommands,
			Object.assign(defaults, {
				getPackage: () => _packageData,
				program: {
					root: true,
				},
			})
		);
		expect(_getScriptCommands()).toEqual({
			start: ['path-to-package-a', 'path-to-package-b', '/test/'],
		});
	});
});
