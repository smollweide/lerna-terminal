const resolve = require('../resolve');
const renderHelp = require('./index');

describe('renderHelp', () => {
	it('default', done => {
		resolve(renderHelp, {
			log() {},
			renderClear() {},
			renderCmdPrefix: done,
		})();
	});
});
