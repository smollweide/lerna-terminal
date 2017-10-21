const dcopy = require('deep-copy');
const getScriptCommands = require('../get-script-commands');

const diGetLernaPackages = onMatch => {
	onMatch('path-to-package-a');
	onMatch('path-to-package-b');
};

const diPackageData = {
	scripts: {
		start: 'npm run something',
	},
};

describe('getScriptCommands', () => {
	it('find scripts', () => {
		const _packageData = dcopy(diPackageData);
		expect(
			getScriptCommands({
				diGetLernaPackages,
				diGetPackage: () => _packageData,
			})
		).toEqual({ start: ['path-to-package-a', 'path-to-package-b'] });
	});
	it('a package without scripts', () => {
		const _packageData = dcopy(diPackageData);
		expect(
			getScriptCommands({
				diGetLernaPackages,
				diGetPackage: path => {
					return path === 'path-to-package-a' ? _packageData : {};
				},
			})
		).toEqual({ start: ['path-to-package-a'] });
	});
});
