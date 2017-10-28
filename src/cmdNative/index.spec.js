const resolve = require('../resolve');
const { cmdNative } = require('./index');

const state = {};

describe('cmdNative', () => {
	it('uiState.focus should be empty', done => {
		const _cmdNative = resolve(cmdNative, { state });
		expect(_cmdNative(undefined, done)).toBe(undefined);
	});
});
