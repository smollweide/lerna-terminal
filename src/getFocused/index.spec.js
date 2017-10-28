const resolve = require('../resolve');
const { getFocused } = require('./index');

const uiState = {
	focus: 'utils',
};

describe('getFocused', () => {
	it('is not focused 1 -> undefined', () => {
		const _getFocused = resolve(getFocused, { uiState: {} });
		expect(_getFocused()).toBe(undefined);
	});
	it('is not focused 2 -> undefined', () => {
		const _getFocused = resolve(getFocused, { uiState: { focus: '' } });
		expect(_getFocused()).toBe(undefined);
	});
	it('is not focused 3 -> undefined', () => {
		const _getFocused = resolve(getFocused, { uiState: { focus: 'all' } });
		expect(_getFocused()).toBe(undefined);
	});
	it('is not focused because is not a valid packageName', () => {
		const _getFocused = resolve(getFocused, { uiState, isValidPackageName: () => false });
		expect(_getFocused()).toBe(undefined);
	});
	it('is focused and returns name', () => {
		const _getFocused = resolve(getFocused, { uiState, isValidPackageName: () => true });
		expect(_getFocused()).toBe('utils');
	});
});
