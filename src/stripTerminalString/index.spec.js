const stripTerminalString = require('./index');

describe('stripTerminalString', () => {
	it('default', () => {
		expect(
			JSON.stringify(
				{
					text: stripTerminalString(
						'\u001b[31m 10% building modules 2/2 modules 0 active(node:11160) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead\u001b[39m'
					),
				},
				null,
				2
			)
		).toEqual(
			JSON.stringify(
				{
					text:
						'\u001b[31m 10% building modules 2/2 modules 0 active(node:11160) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead\u001b[39m',
				},
				null,
				2
			)
		);
	});
	it('backslashes', () => {
		expect(
			JSON.stringify(
				{
					text: stripTerminalString(
						'\u001b[31m\b\b\b\b\b\b\b\b\b\b\b\b\b\b 10% building modules 0/1 modules 1 active …ybook/core/dist/client/manager/index.js\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b 10% building modules 1/1 modules 0 active\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b 10% building modules 1/2 modules 1 active …/configs/storybook/.storybook/config.js\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b 10% building modules 2/2 modules 0 active(node:11160) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead\u001b[39m'
					),
				},
				null,
				2
			)
		).toEqual(
			JSON.stringify(
				{
					text:
						'\u001b[31m 10% building modules 2/2 modules 0 active(node:11160) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead\u001b[39m',
				},
				null,
				2
			)
		);
	});
	it('tabs', () => {
		expect(
			JSON.stringify(
				{
					text: stripTerminalString(
						'\u001b[31m \t\t10% building modules 2/2 modules 0 active(node:11160) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead\u001b[39m'
					),
				},
				null,
				2
			)
		).toEqual(
			JSON.stringify(
				{
					text:
						'\u001b[31m     10% building modules 2/2 modules 0 active(node:11160) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead\u001b[39m',
				},
				null,
				2
			)
		);
	});
});
