const resolve = require('../resolve');
const cmdClear = require('./index');

const state = {
	utils: {
		log: [123],
	},
	ui: {
		log: ['started'],
	},
	dateTime: {},
};

describe('cmdClear', () => {
	it('execute without error', done => {
		const _cmdClear = resolve(cmdClear, Object.assign({}, { state }));
		expect(_cmdClear('utils', done)).toBe(undefined);
	});
	it('clear defined package', done => {
		const _cmdClear = resolve(cmdClear, Object.assign({}, { state }));
		_cmdClear('utils', done);
		expect(state.utils.log).toEqual([]);
	});
	it('try clear undefined package', done => {
		const _cmdClear = resolve(cmdClear, Object.assign({}, { state }));
		expect(_cmdClear('utils2', done)).toBe(undefined);
	});
	it('clear all package', done => {
		const _cmdClear = resolve(cmdClear, Object.assign({}, { state }));
		_cmdClear(undefined, done);
		expect(state.utils.log).toEqual([]);
		expect(state.ui.log).toEqual([]);
	});
});
