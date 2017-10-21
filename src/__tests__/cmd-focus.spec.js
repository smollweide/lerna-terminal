const cmdFocus = require('../cmd-focus');

const diUiState = {
	focus: 'all',
};

describe('cmdFocus', () => {
	it('execute without error', done => {
		expect(cmdFocus('utils', done)).toBe(undefined);
	});
	it('focus defined package', done => {
		const _diUiState = Object.assign({}, diUiState);
		cmdFocus('utils', done, _diUiState);
		expect(_diUiState.focus).toBe('utils');
	});
});
