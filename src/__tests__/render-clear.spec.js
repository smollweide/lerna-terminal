// const dcopy = require('deep-copy');
const renderClear = require('../render-clear');

describe('renderClear', () => {
	it('default', done => {
		renderClear({
			log(logText) {
				expect(typeof logText).toBe('string');
				done();
			},
		});
	});
});
