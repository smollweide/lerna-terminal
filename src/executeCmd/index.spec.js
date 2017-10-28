const resolve = require('../resolve');
const { executeCmd } = require('./index');

// const uiState = {
// 	focus: 'utils',
// };

const defaults = {
	render() {},
	getFocused() {},
	cmdNative() {},
	cmdStart() {},
	cmdStop() {},
	cmdClear() {},
	cmdFocus() {},
	cmdHelp() {},
	cmdExit() {},
};

describe('executeCmd', () => {
	it('invalid with empty string', () => {
		const _executeCmd = resolve(executeCmd, Object.assign({}, defaults));
		expect(_executeCmd('')).toBe(undefined);
	});
	it('invalid with undefined', () => {
		const _executeCmd = resolve(executeCmd, Object.assign({}, defaults));
		expect(_executeCmd(undefined)).toBe(undefined);
	});
	it('invalid with undefined', () => {
		const _executeCmd = resolve(executeCmd, Object.assign({}, defaults));
		expect(_executeCmd('clear')).toBe(undefined);
	});
	it('execute native (means cmd for package child_process)', done => {
		const _executeCmd = resolve(
			executeCmd,
			Object.assign({}, defaults, {
				getFocused: () => 'utils',
				cmdNative() {
					done();
				},
			})
		);
		expect(_executeCmd('npm run test')).toBe(undefined);
	});
	it('execute start all', done => {
		const _executeCmd = resolve(executeCmd, Object.assign({}, defaults, { cmdStart: done }));
		expect(_executeCmd('start')).toBe(undefined);
	});
	it('execute start child_process because of focused', done => {
		const _executeCmd = resolve(
			executeCmd,
			Object.assign({}, defaults, {
				getFocused: () => 'utils',
				cmdStart(packageName) {
					expect(packageName).toBe('utils');
					done();
				},
			})
		);
		expect(_executeCmd('start utils')).toBe(undefined);
	});
	it('execute start child_process because of second cmd argument', done => {
		const _executeCmd = resolve(
			executeCmd,
			Object.assign({}, defaults, {
				cmdStart(packageName) {
					expect(packageName).toBe('utils');
					done();
				},
			})
		);
		expect(_executeCmd('start utils')).toBe(undefined);
	});
	it('focus shortcut', done => {
		const _executeCmd = resolve(
			executeCmd,
			Object.assign({}, defaults, {
				cmdFocus(packageName) {
					expect(packageName).toBe('utils');
					done();
				},
			})
		);
		expect(_executeCmd('utils')).toBe(undefined);
	});
});
