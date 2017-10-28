const dcopy = require('deep-copy');
const resolve = require('../resolve');
const { getLernaPackages } = require('./index');

const defaults = {
	fs: {
		realpathSync: () => '/test/',
	},
	glob: {
		sync: () => ['/a/package.json', '/b/package.json'],
	},
	path: {
		join: () => '/test/',
	},
	getLerna: () => ({
		packages: ['configs/*', 'packages/*/*'],
	}),
	process: { cwd: () => '/test/' },
};

describe('getLernaPackages', () => {
	it('returns packages', done => {
		const _defaults = dcopy(defaults);
		const _getLernaPackages = resolve(getLernaPackages, _defaults);
		expect(_getLernaPackages(() => done())).toEqual(['/a', '/b', '/a', '/b']);
	});
	it('returns packages without onMatch', () => {
		const _defaults = dcopy(defaults);
		const _getLernaPackages = resolve(getLernaPackages, _defaults);
		expect(_getLernaPackages(undefined)).toEqual(['/a', '/b', '/a', '/b']);
	});
});
