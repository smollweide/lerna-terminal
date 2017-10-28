const resolve = require('../resolve');
const render = require('./index');

describe('render', () => {
	it('focus all', done => {
		resolve(render, {
			uiState: { focus: 'all' },
			renderAllPanels: done,
			renderHelp() {},
			renderFocus() {},
		})();
	});
	it('focus empty string', done => {
		resolve(render, {
			uiState: { focus: '' },
			renderAllPanels: done,
			renderHelp() {},
			renderFocus() {},
		})();
	});
	it('focus help', done => {
		resolve(render, {
			uiState: { focus: 'help' },
			renderAllPanels() {},
			renderHelp: done,
			renderFocus() {},
		})();
	});
	it('focus', done => {
		resolve(render, {
			uiState: { focus: 'test' },
			renderAllPanels() {},
			renderHelp() {},
			renderFocus: done,
		})();
	});
});
