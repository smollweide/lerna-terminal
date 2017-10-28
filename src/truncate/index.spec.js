const truncate = require('./index');

describe('truncate', () => {
	it('default', () => {
		expect(truncate('value', 10)).toBe('value');
	});
	it('shorten', () => {
		expect(truncate('lorem ipsum', 5)).toBe('l...');
	});
});
