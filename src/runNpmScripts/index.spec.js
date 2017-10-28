const resolve = require('../resolve');
const runNpmScripts = require('./index');

const program = {
	script: 'start',
};

const commands = {
	start: ['/path/to/package/utils', '/path/to/package/ui'],
};

const path = {
	basename: _path => _path.split('/')[4],
};

describe('runNpmScripts', () => {
	it('no script found -> throw error', () => {
		const _commands = {};
		expect(() => {
			resolve(runNpmScripts, {
				getScriptCommands: () => _commands,
				program,
			})();
		}).toThrow();
	});
	it('packages ignored', () => {
		const _commands = Object.assign({}, commands);
		resolve(runNpmScripts, {
			getScriptCommands: () => _commands,
			program,
			isIgnoredPackage: () => true,
			path,
		})();
	});
	it('packages in state', () => {
		const state = {};
		const _commands = Object.assign({}, commands);
		resolve(runNpmScripts, {
			getScriptCommands: () => _commands,
			program,
			isIgnoredPackage: () => false,
			path,
			state,
			runNpmScript: () => 'terminal',
		})();
		expect(state).toEqual({ ui: { log: [], terminal: 'terminal' }, utils: { log: [], terminal: 'terminal' } });
	});
	it('package.terminal.onRecieve -> update log', () => {
		const state = {};
		const _commands = Object.assign({}, commands);
		resolve(runNpmScripts, {
			getScriptCommands: () => _commands,
			program,
			isIgnoredPackage: () => false,
			path,
			state,
			runNpmScript: ({ onRecieve }) => {
				onRecieve('test\n');
				onRecieve('test2');
			},
			getText: text => text,
			render() {},
		})();
		expect(state.utils.log).toEqual(['test', '', 'test2']);
	});
	it('package.terminal.onError -> update log', () => {
		const state = {};
		const _commands = Object.assign({}, commands);
		resolve(runNpmScripts, {
			getScriptCommands: () => _commands,
			program,
			isIgnoredPackage: () => false,
			path,
			state,
			runNpmScript: ({ onError }) => {
				onError('test\n');
				onError('test2');
			},
			getText: text => text,
			render() {},
		})();
		expect(state.utils.log).toEqual(['test', '', 'test2']);
	});
	it('package.terminal.onExit -> update log', () => {
		const state = {};
		const _commands = Object.assign({}, commands);
		resolve(runNpmScripts, {
			getScriptCommands: () => _commands,
			program,
			isIgnoredPackage: () => false,
			path,
			state,
			runNpmScript: ({ onExit }) => {
				onExit();
			},
			getText: text => text,
			render() {},
		})();
		expect(state.utils.log).toEqual(['stop: utils']);
	});
});
