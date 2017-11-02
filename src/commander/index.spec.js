const dcopy = require('deep-copy');
const resolve = require('../resolve');
const { _runCommander } = require('./index');

const program = {
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
};

const packageData = {
	version: '1.0.0',
};

describe('commander', () => {
	it('execute without error', () => {
		const _program = dcopy(program);
		resolve(_runCommander, { program: _program, process: { argv: ['/', '/', 'start'] }, packageData })();
		expect(_program.script).toBe('test');
	});
});
