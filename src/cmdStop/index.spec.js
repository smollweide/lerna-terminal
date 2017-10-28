const dcopy = require('deep-copy');
const resolve = require('../resolve');
const { cmdStop } = require('./index');

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
		const _cmdStop = resolve(cmdStop, { state: {}, uiState: {} });
		expect(_cmdStop('utils', () => {})).toBe(undefined);
	});
	it('stop defined package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			stop: done,
		};
		const _cmdStop = resolve(cmdStop, { state: _state, uiState: {} });
		_cmdStop('utils', () => {});
	});
	it('stop focused package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			stop: done,
		};
		const _cmdStop = resolve(cmdStop, { state: _state, uiState: { focus: 'utils' } });
		_cmdStop(undefined, () => {});
	});
	it('try to stop not existing but focused package', () => {
		const _state = dcopy(state);
		const _cmdStop = resolve(cmdStop, { state: _state, uiState: { focus: 'utils2' } });
		_cmdStop(undefined, () => {});
	});
	it('stop all package', done => {
		const _state = dcopy(state);
		_state.utils.terminal = {
			stop: done,
		};
		const _cmdStop = resolve(cmdStop, { state: _state, uiState: {} });
		_cmdStop(undefined, () => {});
	});
	it('stop all package 2', done => {
		const _state = dcopy(state);
		_state.terminalUtils.terminal = {
			stop: done,
		};
		const _cmdStop = resolve(cmdStop, { state: _state, uiState: {} });
		_cmdStop(undefined, () => {});
	});
});
