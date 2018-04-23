/* global jest */
const renderClear = require('./index');

describe('renderClear', () => {
	it('default', done => {
		process.stdout.write = logText => {
			expect(typeof logText).toBe('string');
			done();
		};
		renderClear();
	});
});
