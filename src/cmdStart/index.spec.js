const dcopy = require('deep-copy');
const resolve = require('../resolve');
const { cmdStart } = require('./index');

const state = {
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
	it('execute without error', () => {
		const _cmdStart = resolve(cmdStart, { state: {}, uiState: {}, cmdClear() {} });
		expect(_cmdStart('utils', () => {})).toBe(undefined);
	});
	it('start defined package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			start: done,
		};
		const _cmdStart = resolve(cmdStart, { state: _state, uiState: {}, cmdClear() {} });
		_cmdStart('utils', () => {});
	});
	it('start focused package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			start: done,
		};
		const _cmdStart = resolve(cmdStart, { state: _state, uiState: { focus: 'utils' }, cmdClear() {} });
		_cmdStart(undefined, () => {});
	});
	it('try to start not existing but focused package', () => {
		const _state = dcopy(state);
		const _cmdStart = resolve(cmdStart, { state: _state, uiState: { focus: 'utils2' }, cmdClear() {} });
		_cmdStart(undefined, () => {});
	});
	it('start all package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			start: done,
		};
		const _cmdStart = resolve(cmdStart, { state: _state, uiState: {}, cmdClear() {} });
		_cmdStart(undefined, () => {});
	});
	it('start all package 2', done => {
		const _state = dcopy(state);
		_state.terminalUtils.terminal = {
			start: done,
		};
		const _cmdStart = resolve(cmdStart, { state: _state, uiState: {}, cmdClear() {} });
		_cmdStart(undefined, () => {});
	});
});
