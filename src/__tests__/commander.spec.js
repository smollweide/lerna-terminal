const dcopy = require('deep-copy');
const { runCommander } = require('../commander');

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

describe('commandListener', () => {
	it('execute without error', () => {
		const _program = dcopy(program);
		expect(runCommander({ program: _program })).toBe(undefined);
	});
	it('script is missing -> throw error', () => {
		const _program = dcopy(program);
		_program.script = undefined;
		expect(() => {
			runCommander({ program: _program });
		}).toThrow();
	});
});
