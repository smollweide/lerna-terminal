const dcopy = require('deep-copy');
const cmdStop = require('../cmd-stop');

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
		log: ['stoped'],
	},
	dateTime: {},
};

describe('cmdStop', () => {
	it('execute without error', () => {
		expect(cmdStop('utils', () => {}, { state: {}, uiState: {} })).toBe(undefined);
	});
	it('stop defined package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			stop: done,
		};
		cmdStop('utils', () => {}, { state: _state, uiState: {} });
	});
	it('stop focused package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			stop: done,
		};
		cmdStop(undefined, () => {}, { state: _state, uiState: { focus: 'utils' } });
	});
	it('try to stop not existing but focused package', () => {
		const _state = dcopy(state);
		cmdStop(undefined, () => {}, { state: _state, uiState: { focus: 'utils2' } });
	});
	it('stop all package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			stop: done,
		};
		cmdStop(undefined, () => {}, { state: _state, uiState: {} });
	});
	it('stop all package 2', done => {
		const _state = dcopy(state);
		_state.terminalUtils.terminal = {
			stop: done,
		};
		cmdStop(undefined, () => {}, { state: _state, uiState: {} });
	});
});
