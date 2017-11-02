const resolve = require('../resolve');
const { renderAllPanels } = require('./index');

const state = {
	utils: {
		log: ['started'],
		terminal: {
			isRunning: true,
		},
	},
	ui: {
		log: ['row'],
		terminal: {
			isRunning: true,
		},
	},
	ui2: {
		log: ['row'],
		terminal: {
			isRunning: true,
		},
	},
	ui3: {
		log: ['row'],
		terminal: {
			isRunning: true,
		},
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
