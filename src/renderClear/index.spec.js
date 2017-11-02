const resolve = require('../resolve');
const { renderClear } = require('./index');

describe('renderClear', () => {
	it('default', done => {
		const _renderClear = resolve(renderClear, {
			log(logText) {
				expect(typeof logText).toBe('string');
				done();
			},
		});
		_renderClear();
	});
});
