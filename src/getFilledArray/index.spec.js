const getFilledArray = require('./index');

describe('getFilledArray', () => {
	it('execute without error', () => {
		expect(getFilledArray(2, 'a')).toEqual(['a', 'a']);
	});
	it('empty array', () => {
		expect(getFilledArray(0, 'a')).toEqual([]);
	});
	it('fill with array', () => {
		expect(getFilledArray(2, ['a'])).toEqual([['a'], ['a']]);
	});
	it('fill with object', () => {
		expect(getFilledArray(2, { a: 'a' })).toEqual([{ a: 'a' }, { a: 'a' }]);
	});
	it('no length and value', () => {
		expect(getFilledArray()).toEqual(['', '', '', '', '', '', '', '', '', '']);
	});
});
