const cmdHelp = require('../cmd-help');

const diUiState = {
	focus: 'all',
};

describe('cmdFocus', () => {
	it('execute without error', done => {
		expect(cmdHelp(done)).toBe(undefined);
	});
	it('focus defined package', done => {
		const _diUiState = Object.assign({}, diUiState);
		cmdHelp(done, _diUiState);
		expect(_diUiState.focus).toBe('help');
	});
});
