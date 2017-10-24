// const dcopy = require('deep-copy');
const renderCmdPrefix = require('../render-cmd-prefix');

const diUiState = {
	focus: 'all',
};

describe('renderCmdPrefix', () => {
	// it('default', () => {});
	it('default', done => {
		const _diUiState = Object.assign({}, diUiState);
		renderCmdPrefix({
			uiState: _diUiState,
			write(writeText) {
				expect(typeof writeText).toBe('string');
				done();
			},
		});
	});
	it('focus "log"', done => {
		const _diUiState = Object.assign({}, diUiState);
		_diUiState.focus = 'log';
		renderCmdPrefix({
			uiState: _diUiState,
			write(writeText) {
				expect(typeof writeText).toBe('string');
				done();
			},
		});
	});
});
