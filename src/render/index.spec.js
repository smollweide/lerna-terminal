const resolve = require('../resolve');
const { render } = require('./index');

describe('render', () => {
	it('focus all', done => {
		resolve(render, {
			uiState: { focus: 'all', notifications: [] },
			renderAllPanels: done,
			renderHelp() {},
			renderFocus() {},
			renderHelpFocus() {},
		})();
	});
	it('render notification', done => {
		resolve(render, {
			uiState: {
				focus: 'all',
				notifications: [
					{
						type: 'error',
						message: 'message',
						delay: 10,
					},
				],
			},
			renderAllPanels() {},
			renderHelp() {},
			renderFocus() {},
			renderHelpFocus() {},
			renderNotification: () => {
				done();
			},
		})();
	});
	it('focus empty string', done => {
		resolve(render, {
			uiState: { focus: '', notifications: [] },
			renderAllPanels: done,
			renderHelp() {},
			renderFocus() {},
			renderHelpFocus() {},
		})();
	});
	it('help', done => {
		resolve(render, {
			uiState: { focus: 'all', notifications: [], help: true },
			renderAllPanels() {},
			renderHelp: done,
			renderFocus() {},
			renderHelpFocus() {},
		})();
	});
	it('focus help', done => {
		resolve(render, {
			uiState: { focus: 'test', notifications: [], help: true },
			renderAllPanels() {},
			renderHelp() {},
			renderFocus() {},
			renderHelpFocus: done,
		})();
	});
	it('focus', done => {
		resolve(render, {
			uiState: { focus: 'test', notifications: [] },
			renderAllPanels() {},
			renderHelp() {},
			renderFocus: done,
			renderHelpFocus() {},
		})();
	});
});
