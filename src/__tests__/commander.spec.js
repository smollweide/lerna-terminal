const dcopy = require('deep-copy');
const { runCommander } = require('../commander');

const diProgramm = {
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
		const _diProgramm = dcopy(diProgramm);
		expect(runCommander(_diProgramm)).toBe(undefined);
	});
	it('script is missing -> throw error', () => {
		const _diProgramm = dcopy(diProgramm);
		_diProgramm.script = undefined;
		expect(() => {
			runCommander(_diProgramm);
		}).toThrow();
	});
});
