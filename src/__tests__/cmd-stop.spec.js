const dcopy = require('deep-copy');
const cmdStop = require('../cmd-stop');

const diState = {
	utils: {
		log: [123],
		terminal: {},
	},
	terminalUtils: {
		log: [123],
		terminal: {},
	},
	ui: {
		log: ['stoped'],
	},
	dateTime: {},
};

describe('cmdStop', () => {
	it('execute without error', () => {
		expect(cmdStop('utils')).toBe(undefined);
	});
	it('stop defined package', done => {
		const _diState = dcopy(diState);
		_diState.utils.terminal = {
			stop: done,
		};
		cmdStop('utils', _diState);
	});
	it('stop all package', done => {
		const _diState = dcopy(diState);
		_diState.utils.terminal = {
			stop: done,
		};
		cmdStop(undefined, _diState);
	});
	it('stop all package 2', done => {
		const _diState = dcopy(diState);
		_diState.terminalUtils.terminal = {
			stop: done,
		};
		cmdStop(undefined, _diState);
	});
});
