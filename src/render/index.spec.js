const resolve = require('../resolve');
const { render } = require('./index');

describe('render', () => {
	it('focus all', done => {
		resolve(render, {
			uiState: { focus: 'all', notifications: [] },
			renderAllPanels: done,
			renderHelp() {},
			renderFocus() {},
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
		})();
	});
	it('focus help', done => {
		resolve(render, {
			uiState: { focus: 'help', notifications: [] },
			renderAllPanels() {},
			renderHelp: done,
			renderFocus() {},
		})();
	});
	it('focus', done => {
		resolve(render, {
			uiState: { focus: 'test', notifications: [] },
			renderAllPanels() {},
			renderHelp() {},
			renderFocus: done,
		})();
	});
});
