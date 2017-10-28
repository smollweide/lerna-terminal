const resolve = require('../resolve');
const { renderCmdPrefix } = require('./index');

const uiState = {
	focus: 'all',
};

describe('renderCmdPrefix', () => {
	// it('default', () => {});
	it('default', done => {
		const _uiState = Object.assign({}, uiState);
		const _renderCmdPrefix = resolve(renderCmdPrefix, {
			uiState: _uiState,
			write(writeText) {
				expect(typeof writeText).toBe('string');
				done();
			},
		});
		_renderCmdPrefix();
	});
	it('focus "log"', done => {
		const _uiState = Object.assign({}, uiState);
		_uiState.focus = 'log';
		const _renderCmdPrefix = resolve(renderCmdPrefix, {
			uiState: _uiState,
			write(writeText) {
				expect(typeof writeText).toBe('string');
				done();
			},
		});
		_renderCmdPrefix();
	});
});
