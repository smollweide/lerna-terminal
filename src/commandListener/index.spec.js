/* global jest, afterEach */
/* eslint global-require: 0*/
const commandListener = require('./index');
const { getUiState } = require('../store');

jest.mock('../store');

const _process = {
	env: global.process.env,
	stdin: {
		setEncoding: jest.fn(),
		setRawMode: jest.fn(),
		resume: jest.fn(),
		on: jest.fn(),
		read() {
			return 'test';
		},
	},
	stdout: {
		write: jest.fn(),
	},
};

const addString = inValue => [inValue];

const addReturn = () => [
	'',
	{
		ctrl: false,
		name: 'return',
	},
];

const addCtrlC = () => [
	'c',
	{
		ctrl: true,
		name: 'c',
	},
];

const addBackspace = () => [
	'',
	{
		ctrl: false,
		name: 'backspace',
	},
];

const addUp = () => [
	'',
	{
		name: 'up',
	},
];
const addDown = () => [
	'',
	{
		name: 'down',
	},
];

describe('commandListener', () => {
	beforeEach(() => {
		getUiState.mockClear();
	});
	it('write result in buffer', done => {
		getUiState.mockImplementation(() => ({
			onChange(value) {
				expect(value).toBe('test');
			},
		}));
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					cb(...addString('test'));
					done();
				},
			}),
		});
		expect(commandListener(() => {})).toBe(undefined);
	});
	it('send command by press enter', done => {
		getUiState.mockImplementation(() => ({
			onChange(value) {
				expect(value).toBe('');
			},
		}));
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					cb(...addReturn());
					done();
				},
			}),
		});
		commandListener(value => {
			expect(value).toBe('test');
			done();
		});
	});
	it('press enter but without anything entered', () => {
		getUiState.mockImplementation(() => ({
			onChange() {},
		}));
		expect(commandListener(() => {})).toBe(undefined);
	});
	it('press ctrl c', done => {
		getUiState.mockImplementation(() => ({
			onChange() {},
		}));
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					cb(...addString('test'));
					cb(...addCtrlC());
				},
			}),
			exit: () => {
				done();
			},
		});
		expect(commandListener(() => {})).toBe(undefined);
	});
	it('press backspace', done => {
		let counter = 0;
		getUiState.mockImplementation(() => ({
			onChange(value) {
				counter += 1;
				if (counter === 2) {
					expect(value).toBe('tes');
				}
			},
		}));
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					cb(...addString('test'));
					cb(...addBackspace());
					done();
				},
			}),
		});
		expect(commandListener(() => {})).toBe(undefined);
	});
	it('press undefined key', () => {
		getUiState.mockImplementation(() => ({
			onChange() {},
		}));
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					cb(...addString(undefined));
				},
			}),
		});
		expect(commandListener(() => {})).toBe(undefined);
	});
	it('go history up', done => {
		let counter = 0;
		const test = [
			{ cmd: addReturn(), expected: '' },
			{ cmd: addString('test'), expected: 'test' },
			{ cmd: addReturn(), expected: '' },
			{ cmd: addUp(), expected: 'test' },
			{ cmd: addString('2'), expected: 'test2' },
			{ cmd: addReturn(), expected: '' },
			// history = [ 'test2', 'test', 'tes', 'test' ]
			{ cmd: addUp(), expected: 'test2' },
			{ cmd: addUp(), expected: 'test' },
			{ cmd: addUp(), expected: 'tes' },
			{ cmd: addUp(), expected: 'test' },
			{ cmd: addUp(), expected: '' },
			{ cmd: addUp(), expected: 'test2' },
			{ cmd: addUp(), expected: 'test' },
		];
		getUiState.mockImplementation(() => ({
			onChange(value) {
				expect(value).toBe(test[counter].expected);
				if (counter >= test.length - 1) {
					done();
				}
				counter += 1;
			},
		}));
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					test.forEach(({ cmd }) => {
						cb(...cmd);
					});
				},
			}),
		});
		expect(commandListener(() => {})).toBe(undefined);
	});
	it('go history down', done => {
		let counter = 0;
		const test = [
			{ cmd: addUp(), expected: 'tes' },
			{ cmd: addUp(), expected: 'test' },
			{ cmd: addDown(), expected: 'tes' },
			{ cmd: addDown(), expected: 'test' },
			{ cmd: addDown(), expected: 'test2' },
			{ cmd: addDown(), expected: '' },
			{ cmd: addDown(), expected: '' },
			{ cmd: addDown(), expected: '' },
		];
		getUiState.mockImplementation(() => ({
			onChange(value) {
				expect(value).toBe(test[counter].expected);
				if (counter >= test.length - 1) {
					done();
				}
				counter += 1;
			},
		}));
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					test.forEach(({ cmd }) => {
						cb(...cmd);
					});
				},
			}),
		});
		expect(commandListener(() => {})).toBe(undefined);
	});
});
