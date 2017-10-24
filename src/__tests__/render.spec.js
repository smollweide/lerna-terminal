const render = require('../render');

describe('render', () => {
	it('focus all', done => {
		render({
			uiState: { focus: 'all' },
			renderAllPanels: done,
			renderHelp() {},
			renderFocus() {},
		});
	});
	it('focus empty string', done => {
		render({
			uiState: { focus: '' },
			renderAllPanels: done,
			renderHelp() {},
			renderFocus() {},
		});
	});
	it('focus help', done => {
		render({
			uiState: { focus: 'help' },
			renderAllPanels() {},
			renderHelp: done,
			renderFocus() {},
		});
	});
	it('focus', done => {
		render({
			uiState: { focus: 'test' },
			renderAllPanels() {},
			renderHelp() {},
			renderFocus: done,
		});
	});
});
