const resolve = require('../resolve');
const cmdInvalid = require('./index');

const uiState = {
	notifications: [],
};

describe('cmdInvalid', () => {
	it('notification should be added', done => {
		const _cmdInvalid = resolve(cmdInvalid, { uiState });
		_cmdInvalid(done, 'test');
		expect(uiState.notifications[0].type).toBe('error');
	});
});
