const { provideStore } = require('../store');

describe('provideStore', () => {
	it('default', () => {
		expect(provideStore()).toBe(undefined);
	});
});
