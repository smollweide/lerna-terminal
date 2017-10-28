const resolve = require('../resolve');
const cmdFocus = require('./index');

const uiState = {
	focus: 'all',
};

describe('cmdFocus', () => {
	it('execute without error', done => {
		const _cmdFocus = resolve(cmdFocus, { uiState });
		expect(_cmdFocus('utils', done)).toBe(undefined);
	});
	it('focus defined package', done => {
		const _uiState = Object.assign({}, uiState);
		const _cmdFocus = resolve(cmdFocus, { uiState: _uiState });
		_cmdFocus('utils', done);
		expect(_uiState.focus).toBe('utils');
	});
});
