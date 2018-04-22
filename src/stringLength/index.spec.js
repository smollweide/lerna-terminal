const stringLength = require('./index');

describe('stringLength', () => {
	it('1', () => {
		expect(
			stringLength(
				'\u001b[31m 10% building modules 0/1 modules 1 active …ybook/core/dist/client/manager/index.js                                          10% building modules 1/1 modules 0 active 10% building modules 1/2 modules 1 active …/configs/storybook/.storybook/config.js                                          10% building modules 2/2 modules 0 active(node:11160) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead\u001b[39m'
			)
		).toBe(426);
		expect(
			stringLength(
				'\u001b[31m\b\b\b\b\b\b\b\b\b\b\b\b\b\b 10% building modules 0/1 modules 1 active …ybook/core/dist/client/manager/index.js\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b 10% building modules 1/1 modules 0 active\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b 10% building modules 1/2 modules 1 active …/configs/storybook/.storybook/config.js\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b 10% building modules 2/2 modules 0 active(node:11160) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead\u001b[39m'
			)
		).toBe(730);
	});
});
