/* global jest */
const runNpmScripts = require('./index');

const { basename } = require('path');
const getScriptCommands = require('../getScriptCommands');
const isIgnoredPackage = require('../isIgnoredPackage');
const runNpmScript = require('../runNpmScript');
const { getText } = require('../getTerminalPanel');
const { getProgram } = require('../commander');
const { getState } = require('../store');
const render = require('../render');

jest.mock('path');
jest.mock('../getScriptCommands');
jest.mock('../commander');
jest.mock('../isIgnoredPackage');
jest.mock('../store');
jest.mock('../runNpmScript');
jest.mock('../getTerminalPanel');
jest.mock('../render');

describe('runNpmScripts', () => {
	beforeEach(() => {
		getScriptCommands.mockClear();
		getProgram.mockClear();
		isIgnoredPackage.mockClear();
		basename.mockClear();
		getState.mockClear();
		runNpmScript.mockClear();
		getText.mockClear();
		render.mockClear();
	});
	it('no script found -> throw error', () => {
		getScriptCommands.mockImplementation(() => ({}));
		getProgram.mockImplementation(() => ({ script: 'start' }));
		expect(() => {
			runNpmScripts('start');
		}).toThrow();
	});
	it('packages ignored', () => {
		basename.mockImplementation(_path => _path.split('/')[4]);
		getScriptCommands.mockImplementation(() => ({ start: ['/path/to/package/utils', '/path/to/package/ui'] }));
		getProgram.mockImplementation(() => ({ script: 'start' }));
		isIgnoredPackage.mockImplementation(() => true);
		runNpmScripts('start');
	});
	it('packages in state', () => {
		getState.mockImplementation(() => ({}));
		getScriptCommands.mockImplementation(() => ({ start: ['/path/to/package/utils', '/path/to/package/ui'] }));
		isIgnoredPackage.mockImplementation(() => false);
		basename.mockImplementation(_path => _path.split('/')[4]);
		runNpmScript.mockImplementation(() => 'terminal');
		expect(runNpmScripts('start')).toEqual({
			ui: { log: [], terminal: 'terminal' },
			utils: { log: [], terminal: 'terminal' },
		});
	});
	it('package.terminal.onRecieve -> update log', () => {
		getState.mockImplementation(() => ({}));
		getScriptCommands.mockImplementation(() => ({ start: ['/path/to/package/utils', '/path/to/package/ui'] }));
		getProgram.mockImplementation(() => ({ script: 'start' }));
		isIgnoredPackage.mockImplementation(() => false);
		basename.mockImplementation(_path => _path.split('/')[4]);
		getText.mockImplementation(text => text);
		render.mockImplementation(() => {});
		runNpmScript.mockImplementation(({ onRecieve }) => {
			onRecieve('test\n');
			onRecieve('test2');
		});
		expect(runNpmScripts('start').utils.log).toEqual(['test', '', 'test2']);
	});
	it('package.terminal.onError -> update log', () => {
		getState.mockImplementation(() => ({}));
		getScriptCommands.mockImplementation(() => ({ start: ['/path/to/package/utils', '/path/to/package/ui'] }));
		getProgram.mockImplementation(() => ({ script: 'start' }));
		isIgnoredPackage.mockImplementation(() => false);
		basename.mockImplementation(_path => _path.split('/')[4]);
		getText.mockImplementation(text => text);
		render.mockImplementation(() => {});
		runNpmScript.mockImplementation(({ onError }) => {
			onError('test\n');
			onError('test2');
		});
		expect(runNpmScripts('start').utils.log).toEqual(['test', '', 'test2']);
	});
	it('package.terminal.onExit -> update log', () => {
		getState.mockImplementation(() => ({}));
		getScriptCommands.mockImplementation(() => ({ start: ['/path/to/package/utils', '/path/to/package/ui'] }));
		getProgram.mockImplementation(() => ({ script: 'start' }));
		isIgnoredPackage.mockImplementation(() => false);
		basename.mockImplementation(_path => _path.split('/')[4]);
		getText.mockImplementation(text => text);
		render.mockImplementation(() => {});
		runNpmScript.mockImplementation(({ onExit }) => {
			onExit();
		});
		expect(runNpmScripts('start').utils.log).toEqual(['stop: utils']);
	});
	it('package.terminal.onRecieve \x1Bc -> clear log', () => {
		getState.mockImplementation(() => ({}));
		getScriptCommands.mockImplementation(() => ({ start: ['/path/to/package/utils', '/path/to/package/ui'] }));
		getProgram.mockImplementation(() => ({ script: 'start' }));
		isIgnoredPackage.mockImplementation(() => false);
		basename.mockImplementation(_path => _path.split('/')[4]);
		getText.mockImplementation(text => text);
		render.mockImplementation(() => {});
		runNpmScript.mockImplementation(({ onRecieve }) => {
			onRecieve('\x1Bc');
		});
		expect(runNpmScripts('start').utils.log).toEqual(['']);
	});
	it('package.terminal.onError \x1Bc -> clear log', () => {
		getState.mockImplementation(() => ({}));
		getScriptCommands.mockImplementation(() => ({ start: ['/path/to/package/utils', '/path/to/package/ui'] }));
		getProgram.mockImplementation(() => ({ script: 'start' }));
		isIgnoredPackage.mockImplementation(() => false);
		basename.mockImplementation(_path => _path.split('/')[4]);
		getText.mockImplementation(text => text);
		render.mockImplementation(() => {});
		runNpmScript.mockImplementation(({ onError }) => {
			onError('\x1Bc');
		});
		expect(runNpmScripts('start').utils.log).toEqual(['']);
	});
});
