const resolve = require('../resolve');
const { getLerna } = require('./index');

const defaults = {
	fs: {
		realpathSync: value => value,
		readFileSync: () => '{ "test": true }',
	},
	path: {
		join: () => '/test/lerna.json',
	},
	process: {
		cwd: () => '/test/',
	},
	parse: () => ({ test: 'test' }),
};

describe('getLerna', () => {
	it('returns object', () => {
		const _getLerna = resolve(getLerna, defaults);
		expect(_getLerna()).toEqual({ test: true });
	});
});
