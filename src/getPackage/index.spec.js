const resolve = require('../resolve');
const { getPackage } = require('./index');

const defaults = {
	fs: {
		realpathSync: value => value,
		readFileSync: () => '{ "test": true }',
	},
	path: {
		join: () => '/test/package.json',
	},
	parse: () => ({ test: 'test' }),
};

describe('getPackage', () => {
	it('returns object', () => {
		const _getPackage = resolve(getPackage, defaults);
		expect(_getPackage('/path/')).toEqual({ test: true });
	});
});
