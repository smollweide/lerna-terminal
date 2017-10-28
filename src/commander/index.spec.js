const dcopy = require('deep-copy');
const resolve = require('../resolve');
const { _runCommander } = require('./index');

const program = {
	version() {
		return this;
	},
	option() {
		return this;
	},
	parse() {},
	script: 'test',
};

describe('commander', () => {
	it('execute without error', () => {
		const _program = dcopy(program);
		resolve(_runCommander, { program: _program, process: { argv: ['/', '/', '-s', 'start'] } })();
		expect(_program.script).toBe('test');
	});
	it('script is missing -> throw error', () => {
		const _program = dcopy(program);
		_program.script = undefined;
		const __runCommander = resolve(_runCommander, {
			program: _program,
			process: { argv: ['/', '/', '-s', 'start'] },
		});
		expect(() => {
			__runCommander();
		}).toThrow();
	});
});
