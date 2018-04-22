/* global jest */
const renderCmdPrefix = require('./index');
const { getUiState } = require('../store');

jest.mock('../store');

describe('renderCmdPrefix', () => {
	beforeEach(() => {
		getUiState.mockClear();
	});
	it('default', done => {
		getUiState.mockImplementation(() => ({
			focus: 'all',
		}));
		global.process.stdout.write = writeText => {
			expect(writeText).toBe('lerna-terminal~$ ');
			done();
		};
		renderCmdPrefix();
	});
	it('focus "log"', done => {
		getUiState.mockImplementation(() => ({
			focus: 'log',
		}));
		global.process.stdout.write = writeText => {
			expect(writeText).toBe('lerna-terminal/log~$ ');
			done();
		};
		renderCmdPrefix();
	});
});
