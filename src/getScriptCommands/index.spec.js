const dcopy = require('deep-copy');
const resolve = require('../resolve');
const getScriptCommands = require('./index');

const getLernaPackages = onMatch => {
	onMatch('path-to-package-a');
	onMatch('path-to-package-b');
};

const packageData = {
	scripts: {
		start: 'npm run something',
	},
};

describe('getScriptCommands', () => {
	it('find scripts', () => {
		const _packageData = dcopy(packageData);
		const _getScriptCommands = resolve(getScriptCommands, {
			getLernaPackages,
			getPackage: () => _packageData,
		});
		expect(_getScriptCommands()).toEqual({ start: ['path-to-package-a', 'path-to-package-b'] });
	});
	it('a package without scripts', () => {
		const _packageData = dcopy(packageData);
		const _getScriptCommands = resolve(getScriptCommands, {
			getLernaPackages,
			getPackage: path => {
				return path === 'path-to-package-a' ? _packageData : {};
			},
		});
		expect(_getScriptCommands()).toEqual({ start: ['path-to-package-a'] });
	});
});
