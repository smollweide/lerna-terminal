const fs = require('fs');
const getPackage = require('../get-package');

describe('getPackage', () => {
	it('execute without error', () => {
		expect(typeof getPackage(fs.realpathSync(process.cwd()))).toBe('object');
	});
});
