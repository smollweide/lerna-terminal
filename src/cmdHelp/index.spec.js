const resolve = require('../resolve');
const cmdHelp = require('./index');

const uiState = {
	focus: 'all',
};

describe('cmdHelp', () => {
	it('execute without error', done => {
		const _cmdHelp = resolve(cmdHelp, { uiState });
		expect(_cmdHelp(done)).toBe(undefined);
	});
	it('focus help', done => {
		const _uiState = Object.assign({}, uiState);
		const _cmdHelp = resolve(cmdHelp, { uiState: _uiState });
		_cmdHelp(done);
		expect(_uiState.focus).toBe('help');
	});
});
