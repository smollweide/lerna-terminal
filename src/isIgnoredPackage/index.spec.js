const isIgnoredPackage = require('./index');

describe('isIgnoredPackage', () => {
	it('is ignored', () => {
		expect(isIgnoredPackage('/src/package-a', 'package-a,package-b')).toBe(true);
	});
	it('is not ignored', () => {
		expect(isIgnoredPackage('/src/package-a', 'package-c,package-b')).toBe(false);
	});
	it('name conflict', () => {
		expect(isIgnoredPackage('/src/package-a', 'a-package-a,package-b')).toBe(false);
	});
	it('invalid ignoredPackages (Array)', () => {
		expect(isIgnoredPackage('/src/package-a', ['package-a', 'package-b'])).toBe(false);
	});
	it('invalid ignoredPackages (empty string)', () => {
		expect(isIgnoredPackage('/src/package-a', '')).toBe(false);
	});
	it('invalid ignoredPackages (undefined)', () => {
		expect(isIgnoredPackage('/src/package-a')).toBe(false);
	});
});
