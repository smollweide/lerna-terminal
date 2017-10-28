const { provideStore } = require('./index');

describe('provideStore', () => {
	it('default', () => {
		expect(provideStore()).toBe(undefined);
	});
});
