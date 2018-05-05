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
	it('getUiState().print', done => {
		const uiState = Object.assign({}, getUiState());
		uiState.onChange('focus');
		uiState.print('printValue');
		setTimeout(() => {
			expect(uiState.buffer).toBe('printValue');
			expect(uiState.entered).toBe('focus');
			expect(uiState.prefix).toBe('lerna-terminal~$ ');
			done();
		}, 20);
	});
	it('getUiState().print -> focused', done => {
		const uiState = Object.assign({}, getUiState(), {
			focus: 'focusedPackage',
		});
		uiState.print('printValue');
		setTimeout(() => {
			expect(uiState.buffer).toBe('printValue');
			expect(uiState.entered).toBe('');
			expect(uiState.prefix).toBe('lerna-terminal/focusedPackage~$ ');
			done();
		}, 20);
	});
	it('getUiState().clearBuffer', done => {
		const uiState = Object.assign({}, getUiState());
		uiState.print('printValue');
		setTimeout(() => {
			expect(uiState.buffer).toBe('printValue');
			uiState.clearBuffer();
			expect(uiState.buffer).toBe('');
			done();
		}, 20);
	});
});
