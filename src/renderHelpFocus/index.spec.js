const resolve = require('../resolve');
const renderHelpFocus = require('./index');

describe('renderHelpFocus', () => {
	it('default', done => {
		resolve(renderHelpFocus, {
			log() {},
			renderClear() {},
			renderCmdPrefix: done,
		})();
	});
});
