const cmdClear = require('../cmd-clear');

const diState = {
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
		expect(cmdClear('utils', done)).toBe(undefined);
	});
	it('clear defined package', done => {
		const _diState = Object.assign({}, diState);
		cmdClear('utils', done, _diState);
		expect(_diState.utils.log).toEqual([]);
	});
	it('try clear undefined package', done => {
		const _diState = Object.assign({}, diState);
		expect(cmdClear('utils2', done, _diState)).toBe(undefined);
	});
	it('clear all package', done => {
		const _diState = Object.assign({}, diState);
		cmdClear(undefined, done, _diState);
		expect(_diState.utils.log).toEqual([]);
		expect(_diState.ui.log).toEqual([]);
	});
});
