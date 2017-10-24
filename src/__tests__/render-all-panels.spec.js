// const dcopy = require('deep-copy');
const renderAllPanels = require('../render-all-panels');

const diState = {
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
		renderAllPanels({
			state: diState,
			log(logText) {
				expect(typeof logText).toBe('string');
				done();
			},
			renderClear() {},
			renderCmdPrefix() {},
		});
	});
});
