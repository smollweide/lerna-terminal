const { provideStore, getState, getUiState } = require('./index');

describe('provideStore', () => {
	it('default', () => {
		expect(provideStore()).toBe(undefined);
	});
	it('getState', () => {
		expect(getState()).toEqual({});
	});
	it('getUiState', () => {
		const uiState = getUiState();
		expect(uiState.buffer).toBe('');
		expect(uiState.entered).toBe('');
		expect(uiState.prefix).toBe('lerna-terminal~$ ');
		expect(uiState.focus).toBe('all');
		expect(uiState.help).toBe(false);
		expect(uiState.notifications).toEqual([]);
	});
	it('getUiState().onChange', () => {
		const uiState = Object.assign({}, getUiState());
		uiState.print = value => {
			expect(value).toBe('');
		};
		uiState.onChange('lala');
		expect(uiState.entered).toBe('lala');
	});
	it('getUiState().print', () => {
		const uiState = Object.assign({}, getUiState());
		uiState.onChange('focus');
		uiState.print('printValue');
		expect(uiState.buffer).toBe('printValue');
		expect(uiState.entered).toBe('focus');
		expect(uiState.prefix).toBe('lerna-terminal~$ ');
	});
	it('getUiState().print -> focused', () => {
		const uiState = Object.assign({}, getUiState(), {
			focus: 'focusedPackage',
		});
		uiState.print('printValue');
		expect(uiState.buffer).toBe('printValue');
		expect(uiState.entered).toBe('');
		expect(uiState.prefix).toBe('lerna-terminal/focusedPackage~$ ');
	});
	it('getUiState().clearBuffer', () => {
		const uiState = Object.assign({}, getUiState());
		uiState.print('printValue');
		expect(uiState.buffer).toBe('printValue');
		uiState.clearBuffer();
		expect(uiState.buffer).toBe('');
	});
});
