const dcopy = require('deep-copy');
const resolve = require('../resolve');
const { cmdExit } = require('./index');

const uiState = {
	focus: 'utils',
	help: false,
};

describe('cmdExit', () => {
	it('uiState.focus should be empty', done => {
		const _uiState = dcopy(uiState);
		const _cmdExit = resolve(cmdExit, { uiState: _uiState });
		_cmdExit(undefined, done);
		expect(_uiState.focus).toBe('');
		expect(_uiState.help).toBe(false);
	});
	it('uiState.help should be false in case of help mode', done => {
		const _uiState = dcopy(uiState);
		_uiState.help = true;
		const _cmdExit = resolve(cmdExit, { uiState: _uiState });
		_cmdExit(undefined, done);
		expect(_uiState.focus).toBe('utils');
		expect(_uiState.help).toBe(false);
	});
});
