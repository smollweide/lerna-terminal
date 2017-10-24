const renderHelp = require('../render-help');

describe('renderHelp', () => {
	it('default', done => {
		renderHelp({
			log() {},
			renderClear() {},
			renderCmdPrefix: done,
		});
	});
});
