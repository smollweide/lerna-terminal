const resolve = require('../resolve');
const cmdHelp = require('./index');

const uiState = {
	focus: 'all',
};

describe('cmdHelp', () => {
	it('execute without error', done => {
		const _cmdHelp = resolve(cmdHelp, { uiState });
		expect(_cmdHelp('', done)).toBe(undefined);
	});
	it('set help flag', done => {
		const _uiState = Object.assign({}, uiState);
		const _cmdHelp = resolve(cmdHelp, { uiState: _uiState });
		_cmdHelp('', done);
		expect(_uiState.help).toBe(true);
	});
});
