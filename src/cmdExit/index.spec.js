const resolve = require('../resolve');
const { cmdExit } = require('./index');

const uiState = {
	focus: 'utils',
};

describe('cmdExit', () => {
	it('uiState.focus should be empty', done => {
		const _cmdExit = resolve(cmdExit, Object.assign({}, { uiState }));
		expect(_cmdExit(undefined, done)).toBe(undefined);
	});
});
