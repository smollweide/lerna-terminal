const resolve = require('../resolve');
const { renderAllPanels } = require('./index');

const state = {
	utils: {
		log: ['started'],
	},
	ui: {
		log: ['row'],
	},
	ui2: {
		log: ['row'],
	},
	ui3: {
		log: ['row'],
	},
	dateTime: {},
};

describe('renderAllPanels', () => {
	it('default', done => {
		const _renderAllPanels = resolve(renderAllPanels, {
			dimensions: {
				width: 120,
				height: 20,
			},
			state,
			log(logText) {
				expect(typeof logText).toBe('string');
				done();
			},
			renderClear() {},
			renderCmdPrefix() {},
		});
		_renderAllPanels();
	});
});
