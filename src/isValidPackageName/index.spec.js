const resolve = require('../resolve');
const { isValidPackageName } = require('./index');

const state = {
	utils: {
		log: [123],
		terminal: { start() {}, stop() {} },
	},
	ui: {
		log: ['started'],
	},
	dateTime: {},
};

describe('isValidPackageName', () => {
	it('true', () => {
		const _isValidPackageName = resolve(isValidPackageName, { state });
		expect(_isValidPackageName('utils')).toBe(true);
	});
	it('false', () => {
		const _isValidPackageName = resolve(isValidPackageName, { state });
		expect(_isValidPackageName('ui')).toBe(false);
		expect(_isValidPackageName('dateTime')).toBe(false);
	});
});
