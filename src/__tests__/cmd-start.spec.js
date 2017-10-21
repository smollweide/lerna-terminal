const dcopy = require('deep-copy');
const cmdStart = require('../cmd-start');

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
		log: ['started'],
	},
	dateTime: {},
};

describe('cmdStart', () => {
	it('execute without error', done => {
		expect(cmdStart('utils', done)).toBe(undefined);
	});
	it('start defined package', done => {
		const _diState = dcopy(diState);
		_diState.utils.terminal = {
			start: done,
		};
		cmdStart('utils', () => {}, _diState);
	});
	it('start all package', done => {
		const _diState = dcopy(diState);
		_diState.utils.terminal = {
			start: done,
		};
		cmdStart(undefined, () => {}, _diState);
	});
	it('start all package 2', done => {
		const _diState = dcopy(diState);
		_diState.terminalUtils.terminal = {
			start: done,
		};
		cmdStart(undefined, () => {}, _diState);
	});
});
