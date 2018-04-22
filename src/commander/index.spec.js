/* global jest, afterEach */
/* eslint global-require: 0*/
const { runCommander, getProgram } = require('./index');

jest.mock('commander', () => ({
	process: { argv: ['/', '/', 'start'] },
	arguments() {
		return this;
	},
	action(cb) {
		cb('test');
		return this;
	},
	version() {
		return this;
	},
	option() {
		return this;
	},
	parse() {},
	script: 'test',
}));

jest.mock('../../package.json', () => ({
	version: '1.0.0',
}));

describe('commander', () => {
	it('execute without error', () => {
		runCommander();
	});
	it('execute without error', () => {
		getProgram();
	});
});
