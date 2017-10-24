const dcopy = require('deep-copy');
const cmdStart = require('../cmd-start');

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
		expect(cmdStart('utils', () => {}, { state: {}, uiState: {}, cmdClear() {} })).toBe(undefined);
	});
	it('start defined package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			start: done,
		};
		cmdStart('utils', () => {}, { state: _state, uiState: {}, cmdClear() {} });
	});
	it('start focused package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			start: done,
		};
		cmdStart(undefined, () => {}, { state: _state, uiState: { focus: 'utils' }, cmdClear() {} });
	});
	it('try to start not existing but focused package', () => {
		const _state = dcopy(state);
		cmdStart(undefined, () => {}, { state: _state, uiState: { focus: 'utils2' }, cmdClear() {} });
	});
	it('start all package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			start: done,
		};
		cmdStart(undefined, () => {}, { state: _state, uiState: {}, cmdClear() {} });
	});
	it('start all package 2', done => {
		const _state = dcopy(state);
		_state.terminalUtils.terminal = {
			start: done,
		};
		cmdStart(undefined, () => {}, { state: _state, uiState: {}, cmdClear() {} });
	});
});
