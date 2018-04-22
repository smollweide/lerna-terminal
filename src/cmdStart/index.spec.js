/* global jest, afterEach */
/* eslint global-require: 0*/
const cmdStart = require('./index');
const { isValidStartFunction } = require('./index');
const cmdFocus = require('../cmdFocus');

jest.mock('../store', () => ({
	state: {
		utils: {
			log: [123],
			terminal: {
				start: jest.fn(),
			},
		},
		terminalUtils: {
			log: [123],
			terminal: {
				start: jest.fn(),
			},
		},
		ui: {
			log: ['started'],
		},
		dateTime: {},
	},
	uiState: { focus: 'utils' },
}));
const { state, uiState } = require('../store');

describe('cmdStart', () => {
	it('start defined package', () => {
		state.utils.terminal.start.mockReturnValueOnce(
			Object.assign(state.utils.terminal, {
				'start-defined-package': true,
			})
		);
		cmdStart('utils', () => {});
		expect(state.utils.terminal['start-defined-package']).toBe(true);
	});
	it('try start defined but invalid package', () => {
		cmdStart('utils2', () => {});
		expect(state.utils2).toBe(undefined);
	});
	it('start focused package', () => {
		state.utils.terminal.start.mockReturnValueOnce(
			Object.assign(state.utils.terminal, {
				'start-focused-package': true,
			})
		);
		cmdStart(undefined, () => {});
		expect(state.utils.terminal['start-focused-package']).toBe(true);
	});
	it('try start focused but invalid package', () => {
		cmdFocus('utils2', () => {});
		cmdStart(undefined, () => {});
		expect(state.utils2).toBe(undefined);
	});
	it('start all packages', () => {
		cmdFocus('all', () => {});
		expect(uiState.focus).toBe('all');
		state.utils.terminal.start.mockReturnValueOnce(
			Object.assign(state.utils.terminal, {
				'start-all-packages': true,
			})
		);
		state.terminalUtils.terminal.start.mockReturnValueOnce(
			Object.assign(state.terminalUtils.terminal, {
				'start-all-packages': true,
			})
		);
		cmdStart(undefined, () => {});
		expect(state.utils.terminal['start-all-packages']).toBe(true);
		expect(state.terminalUtils.terminal['start-all-packages']).toBe(true);
	});
	describe('isValidStartFunction', () => {
		const _state = {
			utils: {
				terminal: {
					start() {},
				},
			},
			utils2: {},
		};
		it('default', () => {
			expect(isValidStartFunction(_state, 'utils')).toBe(true);
		});
		it('unknown package', () => {
			expect(isValidStartFunction(_state, '')).toBe(false);
		});
	});
});
