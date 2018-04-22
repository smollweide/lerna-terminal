/* global jest, afterEach */
/* eslint global-require: 0*/
const cmdStop = require('./index');
const { isValidStopFunction } = require('./index');
const cmdFocus = require('../cmdFocus');

jest.mock('../store', () => ({
	state: {
		utils: {
			log: [123],
			terminal: {
				stop: jest.fn(),
			},
		},
		terminalUtils: {
			log: [123],
			terminal: {
				stop: jest.fn(),
			},
		},
		ui: {
			log: ['stoped'],
		},
		dateTime: {},
	},
	uiState: { focus: 'utils' },
}));
const { state, uiState } = require('../store');

describe('cmdStop', () => {
	it('stop defined package', () => {
		state.utils.terminal.stop.mockReturnValueOnce(
			Object.assign(state.utils.terminal, {
				'stop-defined-package': true,
			})
		);
		cmdStop('utils', () => {});
		expect(state.utils.terminal['stop-defined-package']).toBe(true);
	});
	it('try stop defined but invalid package', () => {
		cmdStop('utils2', () => {});
		expect(state.utils2).toBe(undefined);
	});
	it('stop focused package', () => {
		state.utils.terminal.stop.mockReturnValueOnce(
			Object.assign(state.utils.terminal, {
				'stop-focused-package': true,
			})
		);
		cmdStop(undefined, () => {});
		expect(state.utils.terminal['stop-focused-package']).toBe(true);
	});
	it('try start focused but invalid package', () => {
		cmdFocus('utils2', () => {});
		cmdStop(undefined, () => {});
		expect(state.utils2).toBe(undefined);
	});
	it('stop all packages', () => {
		cmdFocus('all', () => {});
		expect(uiState.focus).toBe('all');
		state.utils.terminal.stop.mockReturnValueOnce(
			Object.assign(state.utils.terminal, {
				'stop-all-packages': true,
			})
		);
		state.terminalUtils.terminal.stop.mockReturnValueOnce(
			Object.assign(state.terminalUtils.terminal, {
				'stop-all-packages': true,
			})
		);
		cmdStop(undefined, () => {});
		expect(state.utils.terminal['stop-all-packages']).toBe(true);
		expect(state.terminalUtils.terminal['stop-all-packages']).toBe(true);
	});
	describe('isValidStopFunction', () => {
		const _state = {
			utils: {
				terminal: {
					stop() {},
				},
			},
			utils2: {},
		};
		it('default', () => {
			expect(isValidStopFunction(_state, 'utils')).toBe(true);
		});
		it('unknown package', () => {
			expect(isValidStopFunction(_state, '')).toBe(false);
		});
	});
});
