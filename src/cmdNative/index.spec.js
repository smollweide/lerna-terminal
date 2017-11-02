const dcopy = require('deep-copy');
const resolve = require('../resolve');
const { cmdNative } = require('./index');

const state = {
	test: {
		terminal: {
			execute() {},
		},
	},
	testInvalid: {},
};
const uiState = { notifications: [] };

describe('cmdNative', () => {
	it('invalid cmd because of missing cmd', () => {
		const _uiState = dcopy(uiState);
		const _cmdNative = resolve(cmdNative, { state, uiState: _uiState });
		_cmdNative(undefined, 'packageName', () => {});
		expect(_uiState.notifications.length).toBe(1);
	});
	it('invalid because of missing packageName', () => {
		const _uiState = dcopy(uiState);
		const _cmdNative = resolve(cmdNative, { state, uiState: _uiState });
		_cmdNative('npm run start', undefined, () => {});
		expect(_uiState.notifications.length).toBe(0);
	});
	it('invalid because of missing execute function', () => {
		const _uiState = dcopy(uiState);
		const _state = dcopy(state);
		const _cmdNative = resolve(cmdNative, { state: _state, uiState: _uiState });
		_cmdNative('npm run start', 'testInvalid', () => {});
		expect(_uiState.notifications.length).toBe(1);
	});
	it('execute cmd', done => {
		const _uiState = dcopy(uiState);
		const _state = dcopy(state);
		_state.test.terminal.execute = () => {
			done();
		};
		const _cmdNative = resolve(cmdNative, { state: _state, uiState: _uiState });
		_cmdNative('npm run start', 'test', () => {});
	});
	it('execute cmd -> rerender', done => {
		const _uiState = dcopy(uiState);
		const _state = dcopy(state);
		const _cmdNative = resolve(cmdNative, { state: _state, uiState: _uiState });
		_cmdNative('npm run start', 'test', done);
	});
});
