const renderFocus = require('../render-focus');

const state = {
	utils: {
		log: [123],
	},
	ui: {
		log: ['started'],
	},
	dateTime: {},
};

const uiState = {
	focus: 'utils',
};

const dimensions = {
	width: 20,
	height: 20,
};

describe('renderFocus', () => {
	it('default', done => {
		renderFocus({
			state,
			uiState,
			dimensions,
			log(logText) {
				expect(typeof logText).toBe('string');
				done();
			},
			renderClear() {},
			renderCmdPrefix() {},
			renderAllPanels() {},
		});
	});
	it('unknow focus -> renderAllPanels', done => {
		const _uiState = Object.assign({}, uiState);
		_uiState.focus = 'test';
		renderFocus({
			state,
			uiState: _uiState,
			dimensions,
			log() {},
			renderClear() {},
			renderCmdPrefix() {},
			renderAllPanels: done,
		});
	});
});
