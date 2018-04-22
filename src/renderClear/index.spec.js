/* global jest */
const renderClear = require('./index');

describe('renderClear', () => {
	it('default', done => {
		global.console = Object.assign(console, {
			log(logText) {
				expect(typeof logText).toBe('string');
				done();
			},
		});
		renderClear();
	});
});
