const { provideStore, getState, getUiState } = require('./index');

describe('provideStore', () => {
	it('default', () => {
		expect(provideStore()).toBe(undefined);
	});
	it('getState', () => {
		expect(getState()).toEqual({});
	});
	it('getUiState', () => {
		expect(getUiState()).toEqual({ focus: 'all', help: false, notifications: [] });
	});
});
